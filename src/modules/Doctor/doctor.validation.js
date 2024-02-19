import joi from "joi";
import { generalFields } from '../../middleware/validation.js'



export const createDoctor = joi.object({
    email: generalFields.email,
    name: joi.string().min(3).max(25).required(),
    specialties: joi.string().min(3).max(25).required(),
    qualifications: joi.string().min(3).max(25).required(),
    experience: joi.string().min(3).max(25).required(),
    contactInformation: joi.string().min(3).max(25).required(),
    experience: joi.string().min(3).max(25).required(),
    appointment: joi.string().min(3).max(25).required(),
    price: joi.string().min(3).max(25).required(),

    // email: joi.string().email(
    //     { minDomainSegments: 2, maxDomainSegments: 4, tlds: { allow: ['com', 'net', 'edu', 'eg', 'hambozo'] } }
    // ).required(),
    file: generalFields.file.required()
}).required()



export const UpdateDoctor = joi.object({
    email: generalFields.email,
    name: joi.string().min(3).max(25),
    specialties: joi.string().min(3).max(25),
    qualifications: joi.string().min(3).max(25),
    experience: joi.string().min(3).max(25),
    contactInformation: joi.string().min(3).max(25),
    experience: joi.string().min(3).max(25),
    appointment: joi.string().min(3).max(25),
    file: generalFields.file
}).required()