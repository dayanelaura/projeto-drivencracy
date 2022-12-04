import { ObjectId } from "mongodb";
import { choicesCollection, votesCollection } from "../database/db.js";

export async function showResult(req, res){
    try {
        const poll = res.locals.pollObject;
        const { _id, title, expireAt } = poll;

        const allChoices = await choicesCollection.find({ pollId: _id.toString() }).toArray();
        const allChoicesId = allChoices.map(choice => choice._id.toString());
        const allVotes = await votesCollection.find({}).toArray(); 
        const allChoicesVoted = allVotes.map(vote => vote.choiceId);

        let count=0, count0=0, idResult='';

        allChoicesId.forEach((choiceId) => {
            allChoicesVoted.forEach((vote) => {
                if(choiceId === vote){
                    count++;
                }
            });
            if(count > count0){
                count0 = count;
                idResult = choiceId;
            }/* else if(count === count0 && count0 !== 0){
                idResult += " "+choiceId;
            } */   //else if feito para o caso de empate//
            count=0;
        });

        let titleResult;
        allChoices.map(choice => {
            if(choice._id.toString() === idResult){
                titleResult = choice.title;
            }
        });

        const result = {
            _id: _id.toString(),
            title,
            expireAt,
            result: {
                title: titleResult,
                votes: count0,
            }
        }
        
        res.send(result);

    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}