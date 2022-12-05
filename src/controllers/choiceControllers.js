import { ObjectId } from "mongodb";
import { choicesCollection } from "../database/db.js";

export async function sendChoice(req, res){
    try{
        const choice = res.locals.choice;
        await choicesCollection.insertOne(choice);
        res.status(201).send(choice);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function getChoices(req, res){
    try{
        const id = req.params.id;
        const allChoices = await choicesCollection.find({ pollId: ObjectId(id) }).toArray();
        res.status(201).send(allChoices);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}