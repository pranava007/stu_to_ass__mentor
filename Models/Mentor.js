import mongoose from "mongoose";


const MentorHcheam = mongoose.Schema({
    Mentor_Name:String,
    Mentor_Email:String,
    students:[{
       type: mongoose.Schema.ObjectId,ref:'Student'
    }]
})

export default mongoose.model("Mentor",MentorHcheam) 

