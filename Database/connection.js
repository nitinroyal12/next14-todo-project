import mongoose from "mongoose";

let isconnected = false;

export const connect = async () =>{
    
    try{
        await mongoose.connect(process.env.DB,{
            dbName:"Todo_list",
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        isconnected = true
        console.log("Database Connected");
    } catch(err){
        console.log("DATABASE ERROR",err.message);
    }
}



