import joi from "joi";
import { generalFields } from '../../middleware/validation.js'

export const token = joi.object({ token: joi.string().required() }).required()


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
export const login = joi.object({
    email: generalFields.email,
    password: generalFields.password

}).required()



export const sendCode = joi.object({
    email: generalFields.email,

}).required()



export const forgetpassword = joi.object({
    //body
    forgetCode: joi.string().pattern(new RegExp(/[0-9]{4}$/)).required(),
    email: joi.string().email(
        { minDomainSegments: 2, maxDomainSegments: 4, tlds: { allow: ['com', 'net', 'edu', 'eg', 'hambozo'] } }
    ).required(),
    password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
    cPassword: generalFields.cPassword.valid(joi.ref('password')),


}).required();