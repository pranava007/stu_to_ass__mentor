import Mentor from "../Models/Mentor.js"
import Student from "../Models/Student.js"

// ! create POST Method Stutent  
export const CreateStutent = async(req,res)=>{

    try {
        
        const newStudent = new Student(req.body)
        await newStudent.save();
        res.status(200).json({message:"Add New Student",data:[newStudent]})

        
    } catch (error) {
        console.log(error);
        res.status(404).json({message:"Not Fount Post Method"})
        
    }
}
 
// ! create POST Method Mentor

export const CreateMentor = async(req,res)=>{

    try {
        const newMentor = new Mentor(req.body)
        await newMentor.save()
        res.status(200).json({message:"Add New Mentor",data:[newMentor]})

        
    } catch (error) {
        console.log(error);
        res.status(404).json({message:"Not Fount Post Method"})
        
    }
}

// ! GET method Student

export const GetStudent = async(req,res)=>{
    try {
        const getStudent = await Student.find();
        res.status(200).json({message:"Student Data GET Successful",data:[getStudent]})
        
    } catch (error) {
        console.log(error);
        res.status(404).json({message:"Not Found GET method"})
        
    }
}

// ! GET method Mentor

export const GetMentor = async (req,res)=>{
    try {
        const getMentor = await Mentor.find()
        res.status(200).json({message:"Mentor Data GET successfully",data:[getMentor]})
        
    } catch (error) {
        console.log(error);
        res.status(404).json({message:"Not Found GET method"})
    }
}

// ! assing student to mentor
export const assignStudentsToMentor = async (req, res) => {
    try {
        const mentor = await Mentor.findById(req.params.mentorId);
        if (!mentor) return res.status(404).json({ message: "Mentor not found" });

        const studentIds = req.body.studentIds;
        const students = await Student.find({ _id: { $in: studentIds } });

        students.forEach(student => {
            student.mentor = mentor._id;
            mentor.students.push(student._id);
        });

        await Student.updateMany({ _id: { $in: studentIds } }, { mentor: mentor._id });
        await mentor.save();

        res.status(200).json({ message: "Students assigned to mentor successfully" });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "Error assigning students to mentor" });
    }
};

// ! Assign or change mentor for a particular student
export const assignMentorToStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.studentId);
        if (!student) return res.status(404).json({ message: "Student not found" });

        const mentor = await Mentor.findById(req.body.mentorId);
        if (!mentor) return res.status(404).json({ message: "Mentor not found" });

        if (student.mentor) {
            const previousMentor = await Mentor.findById(student.mentor);
            previousMentor.students.pull(student._id);
            await previousMentor.save();
        }

        student.mentor = mentor._id;
        mentor.students.push(student._id);

        await student.save();
        await mentor.save();

        res.status(200).json({ message: "Mentor assigned to student successfully" });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "Error assigning mentor to student" });
    }
};

// !  API to fetch all students for a particular mentor

export const getStudentsForMentor = async (req, res) => {
    try {
        const mentor = await Mentor.findById(req.params.mentorId).populate('students');
        if (!mentor) {
            return res.status(404).json({ message: "Mentor not found" });
        }

        const students = mentor.students;
        res.status(200).json({ message: "Students fetched successfully for mentor", data: students });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching students for mentor" });
    }
};

// ! API to fetch the previously assigned mentor for a student
export const getPreviousMentorForStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.studentId).populate('mentor');
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        const previousMentor = student.mentor;
        res.status(200).json({ message: "Previous mentor fetched successfully for student", data: previousMentor });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching previous mentor for student" });
    }
};