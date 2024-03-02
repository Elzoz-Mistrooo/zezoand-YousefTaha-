import AppointmentModel from "../../../../DB/model/appointmentModel.js";
import { asyncHandler } from "../../../utils/errorHandling.js";


export const createAppointment = asyncHandler(async (req, res, next) => {
    const { patientId, appointmentId } = req.body

    const checkThisAppointment = await AppointmentModel.findById(appointmentId)
    if (!appointmentId) {
        return next(new Error("5osh 5tyha"))
    }
    if (checkThisAppointment.status != "available") {
        return next(new Error("That's taken,"))
    }


    checkThisAppointment.patientId = patientId
    checkThisAppointment.status = "confirmed"

    await checkThisAppointment.save()
    return res.json({ message: "Done", checkThisAppointment })
})

export const GetallAppointment=asyncHandler(async(req,res,next)=>{
    const{doctorId}=req.params
    const appointments=await AppointmentModel.find({doctorId})
    return res.json({message:"Done",appointments})
 
    
})
// appointmentDateTime
