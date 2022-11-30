import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URL);
let db; 

try{
    await mongoClient.connect();
    db = mongoClient.db("drivencracy");
    console.log("MangoDB Connected");
}catch(err){
    console.log(err);
}

export const pollCollection = db.collection("polls");