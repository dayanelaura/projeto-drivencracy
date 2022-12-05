import { ObjectId } from "mongodb";

export async function idValidation(id){
    try{
        const idObject = ObjectId(id);
        return idObject;
    }catch(err){
        console.log('Unprocessable Entity');
    }
}