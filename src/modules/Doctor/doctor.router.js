
import *as DoctorController from './controler/doctor.js'
import { Router } from "express";
const router = Router()
import { Fileupload, allowedExtensions } from '../../utils/multerCloud.js';
import { validation } from '../../middleware/validation.js';
import *as validators from './doctor.validation.js'
// import { author } from '../../middleware/auth.js';

router.get("/getProfile", DoctorController.getProfile)
router.patch("/sendCode", validation(validators.sendCode), DoctorController.sendCode)
router.get("/confirmEmail/:token", validation(validators.token), DoctorController.confirmEmail)
router.get("/newConfirmEmail/:token", validation(validators.token), DoctorController.ReqNewconfirmEmail)
router.patch("/forgetpassword", validation(validators.forgetpassword),DoctorController.forgetpassword )
router.post("/getPatientsandAppoints",DoctorController.getPatientsandAppoints)

router.post("/medicalappointments",DoctorController.medicalappointments)
router.post("/Doctorlogin", DoctorController.Doctorlogin)
router.post("/appointment", DoctorController.appointDoctor)
router.get("/get", DoctorController.getAllDoctors)
router.post("/DoctorSignup", Fileupload(allowedExtensions.Image).single('image'), validation(validators.createDoctor), DoctorController.createDoctor)
router.put("/doctorUpdate/:id", Fileupload(allowedExtensions.Image).single('image'), validation(validators.UpdateDoctor), DoctorController.updateDoctor)
router.delete("/delete/:id", DoctorController.DeleteDoctor)




export default router