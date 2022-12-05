import { ObjectId } from "mongodb";
import { choicesCollection, pollCollection } from "../database/db.js";
import dayjs from "dayjs";
import { idValidation } from "./objectIdValidation.js";

export async function voteValidation(req, res, next){
    const choiceId = req.params.id;

    const id = await idValidation(choiceId);
    if(!id)
        return res.sendStatus(422);

    const isThereChoice = await choicesCollection.findOne({ _id: id });
    
    if(!isThereChoice)
        return res.sendStatus(404);

    const { pollId } = isThereChoice;
    const poll = await pollCollection.findOne({ _id: ObjectId(pollId) });

    const { expireAt } = poll;       
    const now = new Date();
    const date = new Date(expireAt);    

    if(now > date)
        return res.sendStatus(403);

    const createdAt = dayjs().format('YYYY-MM-DD HH:mm');

    res.locals.createdAt = createdAt;
    next();
}