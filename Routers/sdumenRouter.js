import express from "express";
import { CreateMentor, CreateStutent, GetMentor, GetStudent, assignMentorToStudent, assignStudentsToMentor, getPreviousMentorForStudent, getStudentsForMentor } from "../Controllers/stdmenController.js";



export const router = express.Router()

router.post('/createStu',CreateStutent)
router.post('/createMent',CreateMentor)
router.get('/getstudent',GetStudent)
router.get('/getmentor',GetMentor)
router.put('/mentors/:mentorId/students',assignStudentsToMentor)
router.post('/mentors/:studentId',assignMentorToStudent)
router.get('/mentor-students/:mentorId',getStudentsForMentor)
router.get('/previous-mentor/:studentId',getPreviousMentorForStudent)