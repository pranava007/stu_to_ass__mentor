import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const mongodb_url = process.env.MONGODB_URL;

export const mongoBD = async (req,res)=>{
    try {

        const connection = await mongoose.connect(mongodb_url)
        console.log("MongoDB Connection Successfully");
        return connection;
        
    } catch (error) {

        console.log(error);
        res.status(500).json({message:"Mongoos connection error"})
        
    }
}