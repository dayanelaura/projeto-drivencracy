import { ObjectId } from "mongodb";
import { votesCollection } from "../database/db.js";

export async function sendVote(req, res){
    try {
        const choiceId = req.params.id;
        const createdAt = res.locals.createdAt;     

        const vote = { 
            createdAt, 
            choiceId: ObjectId(choiceId), 
        }
        
        await votesCollection.insertOne(vote);
        res.sendStatus(201);
    }catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
}