import { ObjectId } from "mongodb";
import { pollCollection } from "../database/db.js";

export async function pollValidation(req, res, next){
    const id = req.params.id;

    const isTherePoll = await pollCollection.findOne({ _id: ObjectId(id) });
    if(!isTherePoll)
        res.sendStatus(404);
    
    res.locals.pollObject = isTherePoll;
    next();
}