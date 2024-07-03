import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { mongoBD } from "./Database/config.js";
import { router } from "./Routers/sdumenRouter.js";


dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(cors())
mongoBD()

app.use('/api',router)



app.listen(process.env.PORT,(req,res)=>{
    console.log("App is running on");
})

