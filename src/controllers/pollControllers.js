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

export async function getAllPolls(req, res){
    try{
        console.log('a');
        const allPolls = await pollCollection.find({}).toArray();
        res.send(allPolls);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}
