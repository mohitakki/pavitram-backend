import mongoose from "mongoose";

export const connectDatabase = async()=>{
const {connection} =   await  mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    });
    console.log(`MongoDb connected with ${connection.host}`)
}