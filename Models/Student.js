import mongoose from "mongoose";

const StudentShema = mongoose.Schema({
    Student_Name:String,
    Student_Email:String,
    mentor:[{
        type:mongoose.Schema.ObjectId,ref:'Mentor'
    }],
    previousMentors:[{type:mongoose.Schema.ObjectId,ref:'Mentor'}]
})

export default mongoose.model('Student',StudentShema)