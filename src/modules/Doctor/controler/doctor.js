import doctorModel from "../../../../DB/model/doctorModel.js"
import { asyncHandler } from "../../../utils/errorHandling.js";
import cloudinary from "../../../utils/cloudinary.js";
import AppointmentModel from "../../../../DB/model/appointmentModel.js";


// Controller method for fetching all doctors



export const getAllDoctors = asyncHandler(async (req, res, next) => {
    const doctor = await doctorModel.find()
    return res.status(200).json({ message: "Here we are all doctors", doctor })
}
)



export const appointDoctor = asyncHandler(async (req, res, next) => {

    const { doctorId } = req.body
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    for (let i = 0; i < 24; ++i) {
        await AppointmentModel.create({ doctorId, appointmentDateTime: date })
        date.setMinutes(date.getMinutes() + 30);


    }
    return res.json({ message: "Done" })
})


export const createDoctor = asyncHandler(async (req, res, next) => {
    const { email, userName, specialties, qualifications, experience, password, phone, gender, price, section } = req.body;
    const user = await doctorModel.findOne({ email })
    if (user) {
        return next(new Error("You've Account Already"))
    }
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}` })
    const newDoctor = await doctorModel.create({
        email,
        section,
        price,
        userName,
        password, phone, gender,
        specialties,
        qualifications,
        experience,
        image: { secure_url, public_id }

    });



    return res.status(200).json({ message: "Done", newDoctor })

})

export const updateDoctor = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const { name, specialties, qualifications, experience, contactInformation, appointment } = req.body
    const doctor = await doctorModel.findById(id);
    if (!doctor) {
        return res.status(404).send({ message: `Doctor with id  not found` });
    }


    const updatedoctor = await doctorModel.findByIdAndUpdate(id, {
        name,
        specialties,
        qualifications,
        experience,
        contactInformation,
        appointment,

    })


    if (req.file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, { folder: `${process.env.APP_NAME}/Doctor/${id}` })
        await cloudinary.uploader.destroy(doctor.image.public_id)
        doctor.image = { secure_url, public_id }
    }
    // doctor.updatedBy = req.user._id
    await doctor.save()
    res.status(200).send({ message: `Doctor Updated`, updatedoctor });

})



export const DeleteDoctor = asyncHandler(async (req, res, next) => {

    const { id } = req.params;
    const deleteDoctor = await doctorModel.findByIdAndRemove(id)
    if (!deleteDoctor) {
        return next(new Error("Hello 'Doctor not found"))
    }
    res.json({ message: 'Doctor deleted successfully' });
})
