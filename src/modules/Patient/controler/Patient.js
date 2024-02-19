import PatientModel from "../../../../DB/model/PatientModel.js";
import cloudinary from "../../../utils/cloudinary.js";
import { asyncHandler } from "../../../utils/errorHandling.js";

export const getAllPatients = asyncHandler(async (req, res, next) => {
    const Patient = await PatientModel.find()
    return res.status(200).json({ message: "Here we are all patient", Patient })
}
)




export const createPatient = asyncHandler(async (req, res, next) => {
    const { userName, email, dateOfBirth, age, medicalHistory, insuranceDetails, diseases, password, adress, gender, phone } = req.body;

    const checkuser = await PatientModel.findOne({ email: email.toLowerCase() })
    if (checkuser) {
        return next(new Error("Hello,This account it's found email.s"))
    }

    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}` })
    const newPatient = await PatientModel.create({
        password, adress, gender, phone, userName,
        email,
        dateOfBirth,
        age,
        medicalHistory,
        insuranceDetails,
        image: { secure_url, public_id },
        diseases

    })
    return res.status(200).json({ message: "Done", newPatient })

})


export const updatPatient = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const { name, dateOfBirth, age, medicalHistory, insuranceDetails, diseases } = req.body
    const Patient = await PatientModel.findById(id);
    if (!Patient) {
        return res.status(404).send({ message: `Doctors with id  not found` });
    }


    const updatePatient = await PatientModel.findByIdAndUpdate(id, {
        name,
        dateOfBirth,
        age,
        medicalHistory,
        insuranceDetails,
        diseases

    })


    if (req.file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}/Patient/${id}` })
        await cloudinary.uploader.destroy(Patient.image.public_id)
        Patient.image = { secure_url, public_id }
    }

    // doctor.updatedBy = req.user._id
    await Patient.save()
    res.status(200).send({ message: `Doctor Updated`, updatePatient });

})



export const DeletePatient = asyncHandler(async (req, res, next) => {

    const { id } = req.params;
    const deletePatient = await PatientModel.findByIdAndRemove(id)
    if (!deletePatient) {
        return next(new Error("Hello 'Patient not found"))
    }
    res.json({ message: 'Patient deleted successfully' });
})