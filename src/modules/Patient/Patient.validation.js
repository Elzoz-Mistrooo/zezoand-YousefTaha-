import joi from "joi";
import { generalFields } from '../../middleware/validation.js'



export const createPatient = joi.object({
    email: generalFields.email,
    name: joi.string().min(3).max(25).required(),
    dateOfBirth: joi.number().min(3).max(25).required(),
    age: joi.number().min(3).max(25).required(),
    medicalHistory: joi.string().min(3).max(25).required(),
    contactInformation: joi.string().min(3).max(25).required(),
    insuranceDetails: joi.string().min(3).max(25).required(),
    diseases: joi.string().min(3).max(2000).required(),

    // email: joi.string().email(
    //     { minDomainSegments: 2, maxDomainSegments: 4, tlds: { allow: ['com', 'net', 'edu', 'eg', 'hambozo'] } }
    // ).required(),
    file: generalFields.file.required()
}).required()

export const updatePatient = joi.object({
    name: joi.string().min(3).max(25),
    dateOfBirth: joi.number().min(3).max(25),
    age: joi.number().min(3).max(25).required(),
    medicalHistory: joi.string().min(3).max(25),
    contactInformation: joi.string().min(3).max(25),
    insuranceDetails: joi.string().min(3).max(25),
    diseases: joi.string().min(3).max(2000),
    email: generalFields.email,
    // email: joi.string().email(
    //     { minDomainSegments: 2, maxDomainSegments: 4, tlds: { allow: ['com', 'net', 'edu', 'eg', 'hambozo'] } }
    // ).required(),
    file: generalFields.file
}).required()
