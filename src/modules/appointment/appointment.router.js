
import *as Appointment from './controler/appointment.js'
import { Router } from "express";
const router = Router()




// router.get('/', (req, res) => {
//     res.status(200).json({ message: "User Module" })
// })

router.post("/createAppointment", Appointment.createAppointment)
router.get( "/get/:doctorId",Appointment.GetallAppointment)



export default router