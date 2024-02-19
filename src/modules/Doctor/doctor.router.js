
import *as DoctorController from './controler/doctor.js'
import { Router } from "express";
const router = Router()
import { Fileupload, allowedExtensions } from '../../utils/multerCloud.js';
import { validation } from '../../middleware/validation.js';
import *as validators from './doctor.validation.js'
// import { author } from '../../middleware/auth.js';


router.post("/appointment", DoctorController.appointDoctor)
router.get("/get", DoctorController.getAllDoctors)
router.post("/DoctorSignup", Fileupload(allowedExtensions.Image).single('image'), validation(validators.createDoctor), DoctorController.createDoctor)
router.put("/doctorUpdate/:id", Fileupload(allowedExtensions.Image).single('image'), validation(validators.UpdateDoctor), DoctorController.updateDoctor)
router.delete("/delete/:id", DoctorController.DeleteDoctor)




export default router