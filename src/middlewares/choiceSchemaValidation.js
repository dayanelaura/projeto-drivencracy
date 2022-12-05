import { choicesCollection, pollCollection } from "../database/db.js";
import { choiceSchema } from "../models/choiceModel.js";
import { idValidation } from "./objectIdValidation.js";

export async function choiceSchemaValidation(req, res, next){
    const { title, pollId } = req.body;
    const choice = req.body;

    const id = await idValidation(pollId);
    if(!id)
        return res.sendStatus(422);

    const isThereId = await pollCollection.findOne({ _id: id });
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
        pollId: id
    };

    res.locals.choice = choiceObject;
    next();
}