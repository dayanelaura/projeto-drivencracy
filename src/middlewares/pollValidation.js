import { pollCollection } from "../database/db.js";
import { idValidation } from "./objectIdValidation.js";

export async function pollValidation(req, res, next){
    const pollId = req.params.id;
    
    const id = await idValidation(pollId);
    if(!id)
        return res.sendStatus(422);

    const isTherePoll = await pollCollection.findOne({ _id: id });
    if(!isTherePoll)
        return res.sendStatus(404);
    
    res.locals.pollObject = isTherePoll;
    next();
}