import { ObjectId } from "mongodb";
import { choicesCollection, pollCollection } from "../database/db.js";
import dayjs from "dayjs";

export async function voteValidation(req, res, next){
    const id = req.params.id;
    const isThereChoice = await choicesCollection.findOne({ _id: ObjectId(id) });
    
    if(!isThereChoice)
        return res.sendStatus(404);

    const { pollId } = isThereChoice;
    const poll = await pollCollection.findOne({ _id: ObjectId(pollId) });

    const { expireAt } = poll;       
    const now = new Date();
    const date = new Date(expireAt);    

    if(now > date)
        res.sendStatus(403);

    const createdAt = dayjs().format('YYYY-MM-DD HH:mm');

    res.locals.createdAt = createdAt;
    next();
}