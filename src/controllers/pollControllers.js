import { pollCollection } from "../database/db.js";

export async function createPoll(req, res){
    try{
        const poll = res.locals.poll;
        await pollCollection.insertOne(poll);
        res.status(201).send(poll);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}