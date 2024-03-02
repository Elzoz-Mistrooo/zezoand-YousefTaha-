// import joi from 'joi'
// import { generalFields } from '../../middleware/validation.js';


// export const token = joi.object({ token: joi.string().required() }).required()

// export const signup = joi.object({
//     //body
//     firstName: joi.string().min(3).max(20),
//     lastName: joi.string().min(3).max(10),
//     userName: joi.string().alphanum().min(3).max(20).required(),
//     email: generalFields.email,
//     password: generalFields.password,
//     cPassword: generalFields.cPassword.valid(joi.ref("password"))


// }).required();




// export const login = joi.object({
//     email: generalFields.email,
//     password: generalFields.password

// }).required()



// export const sendCode = joi.object({
//     email: generalFields.email,

// }).required()



// export const forgetpassword = joi.object({
//     //body
//     forgetCode: joi.string().pattern(new RegExp(/[0-9]{4}$/)).required(),
//     email: joi.string().email(
//         { minDomainSegments: 2, maxDomainSegments: 4, tlds: { allow: ['com', 'net', 'edu', 'eg', 'hambozo'] } }
//     ).required(),
//     password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
//     cPassword: generalFields.cPassword.valid(joi.ref('password')),


// }).required();

