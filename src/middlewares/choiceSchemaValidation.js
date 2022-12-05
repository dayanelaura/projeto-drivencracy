import { ObjectId } from "mongodb";
import { choicesCollection, pollCollection } from "../database/db.js";
import { choiceSchema } from "../models/choiceModel.js";

export async function choiceSchemaValidation(req, res, next){
    const { title, pollId } = req.body;
    const choice = req.body;

    const isThereId = await pollCollection.findOne({ _id: ObjectId(pollId) });
    if(!isThereId)
        return res.sendStatus(404);

    const isThereTitle = await choicesCollection.findOne({ title: title });
    if(isThereTitle)
        return res.sendStatus(409);

    const { error } = choiceSchema.validate(choice, { abortEarly: false });
    if(error){
        const errors = error.details;
        const errorsTXT = errors.map(detail => detail.message);
        return res.status(422).send(errorsTXT);
    }

    const { expireAt } = isThereId;
    const now = new Date();
    const date = new Date(expireAt);
    if(now>date)
        return res.sendStatus(403);

    const choiceObject = {
        title,
        pollId: ObjectId(pollId)
    };

    res.locals.choice = choiceObject;

    next();
}