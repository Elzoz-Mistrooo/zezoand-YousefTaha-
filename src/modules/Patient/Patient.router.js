import { validation } from '../../middleware/validation.js'
import *as validators from './Patient.validation.js'
import { Fileupload, allowedExtensions } from '../../utils/multerCloud.js';
import *as patientControl from './controler/Patient.js'
import { Router } from "express";
// import appointCate from '../appointment/appointment.router.js'
const router = Router()

// router.use("/:patientId/appointment", appointCate)





router.get("/get", patientControl.getAllPatients)
router.post("/patientSignup", Fileupload(allowedExtensions.Image).single('image'), validation(validators.createPatient), patientControl.createPatient)
router.put("/PatientUpdate/:id", Fileupload(allowedExtensions.Image).single('image'), validation(validators.updatePatient), patientControl.updatPatient)
router.delete("/delete/:id", patientControl.DeletePatient)



export default router