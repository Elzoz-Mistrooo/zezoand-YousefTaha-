import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';
import { asyncHandler } from '../../../utils/errorHandling.js'
import userModel from '../../../../DB/model/User.model.js'
import jwt from 'jsonwebtoken'
import sendEmail from '../../../utils/email.js'
import { hash, compare } from '../../../utils/HashAndCompare.js';
import { generateToken, verifyToken } from '../../../utils/GenerateAndVerifyToken.js'
import { customAlphabet, nanoid } from 'nanoid';



export const signup = asyncHandler(async (req, res, next) => {

    const { userName, email, password, firstName, lastName, gender, age, adress } = req.body
    const checkuser = await userModel.findOne({ email: email.toLowerCase() })
    if (checkuser) {
        return next(new Error("ThisEmailFoundBefore,please Try with new email"))
    }
    //sendEmail
    //hashpassword
    //create user
    const token = generateToken({ payload: { email: email.toLowerCase() }, signature: "SecretEasyClinc", expiresIn: 60 * 5 })
    const refreshToken = generateToken({ payload: { email: email.toLowerCase() }, signature: "SecretEasyClinc", expiresIn: 60 * 60 * 24 })

    const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`
    const rfLink = `${req.protocol}://${req.headers.host}/auth/NewConfirmEmail/${refreshToken}`

    const html = `<!DOCTYPE html>
        <html>
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></head>
        <style type="text/css">
        body{background-color: #88BDBF;margin: 0px;}
        </style>
        <body style="margin:0px;"> 
        <table border="0" width="50%" style="margin:auto;padding:30px;background-color: #F3F3F3;border:1px solid #630E2B;">
        <tr>
        <td>
        <table border="0" width="100%">
        <tr>
        <td>
        <h1>
            <img width="100px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670702280/Group_35052_icaysu.png"/>
        </h1>
        </td>
        <td>
        <p style="text-align: right;"><a href="http://localhost:4200/#/" target="_blank" style="text-decoration: none;">View In Website</a></p>
        </td>
        </tr>
        </table>
        </td>
        </tr>
        <tr>
        <td>
        <table border="0" cellpadding="0" cellspacing="0" style="text-align:center;width:100%;background-color: #fff;">
        <tr>
        <td style="background-color:#630E2B;height:100px;font-size:50px;color:#fff;">
        <img width="50px" height="50px" src="${process.env.logo}">
        </td>
        </tr>
        <tr>
        <td>
        <h1 style="padding-top:25px; color:#630E2B">Email Confirmation</h1>
        </td>
        </tr>
        <tr>
        <td>
        <p style="padding:0px 100px;">
        </p>
        </td>
        </tr>
        <tr>
        <td>
        <a href="${link}" style="margin:10px 0px 30px 0px;border-radius:4px;padding:10px 20px;border: 0;color:#fff;background-color:#630E2B; ">Verify Email address</a>
        </td>
        </tr>
        <tr>
        <td>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <a href="${rfLink}" style="margin:10px 0px 30px 0px;border-radius:4px;padding:10px 20px;border: 0;color:#fff;background-color:#630E2B; ">Request new  esmail </a>
        </td>
        </tr>
        </table>
        </td>
        </tr>
        <tr>
        <td>
        <table border="0" width="100%" style="border-radius: 5px;text-align: center;">
        <tr>
        <td>
        <h3 style="margin-top:10px; color:#000">Stay in touch</h3>
        </td>
        </tr>
        <tr>
        <td>
        <div style="margin-top:20px;">
    
        <a href="${process.env.facebookLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
        <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35062_erj5dx.png" width="50px" hight="50px"></span></a>
        
        <a href="${process.env.instegram}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
        <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35063_zottpo.png" width="50px" hight="50px"></span>
        </a>
        
        <a href="${process.env.twitterLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;;color:#fff;border-radius:50%;">
        <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group_35064_i8qtfd.png" width="50px" hight="50px"></span>
        </a>
    
        </div>
        </td>
        </tr>
        </table>
        </td>
        </tr>
        </table>
        </body>
        </html>`

    if (! await sendEmail({ to: email, subject: 'Confirmation-Email', html })) {
        return next(new Error("Email Rejected"))
    }
    //hashPassword
    const hashPassword = hash({ plaintext: password })
    //save
    const user = await userModel.create({ userName, email, password: hashPassword })
    return res.status(201).json({ message: "Done", user })


})






export const confirmEmail = async (req, res, next) => {
    const { token } = req.params
    const { email } = verifyToken({ token, signature: "SecretEasyClinc" })
    if (!email) {
        return next(new Error("Please,PUT INVAILED EMAIL", { cause: 400 }))
    }
    const user = await userModel.updateOne({ email: email.toLowerCase() }, { confirmEmail: true })
    if (user.matchedCount) {
        res.status(200).json({ messge: 'Confirmed done, please try to login', user })

    } else {
        res.json({ message: "It's not Register Account,or there is problem" })
    }


}

export const ReqNewconfirmEmail = async (req, res, next) => {
    const { token } = req.params
    const { email } = verifyToken({ token, signature: "SecretEasyClinc" })

    if (!email) {
        return next(new Error("Please,PUT INVAILED EMAIL", { cause: 400 }))
    }
    const user = await userModel.findOne({ email: email.toLowerCase() })
    if (!user) {
        return next(new Error("No Email here for making another ReqNewGmaillink"))
    }
    if (user.confirmEmail) {
        return next(new Error("Email Has been confirmed already for long time "))
    }

    const newRefreshtoken = generateToken({ payload: { email: email.toLowerCase() }, signature: "SecretEasyClinc", expiresIn: 60 * 2 })

    const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${newRefreshtoken}`
    const rfLink = `${req.protocol}://${req.headers.host}/auth/NewConfirmEmail/${token}`

    const html = `<!DOCTYPE html>
        <html>
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></head>
        <style type="text/css">
        body{background-color: #88BDBF;margin: 0px;}
        </style>
        <body style="margin:0px;"> 
        <table border="0" width="50%" style="margin:auto;padding:30px;background-color: #F3F3F3;border:1px solid #630E2B;">
        <tr>
        <td>
        <table border="0" width="100%">
        <tr>
        <td>
        <h1>
            <img width="100px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670702280/Group_35052_icaysu.png"/>
        </h1>
        </td>
        <td>
        <p style="text-align: right;"><a href="http://localhost:4200/#/" target="_blank" style="text-decoration: none;">View In Website</a></p>
        </td>
        </tr>
        </table>
        </td>
        </tr>
        <tr>
        <td>
        <table border="0" cellpadding="0" cellspacing="0" style="text-align:center;width:100%;background-color: #fff;">
        <tr>
        <td style="background-color:#630E2B;height:100px;font-size:50px;color:#fff;">
        <img width="50px" height="50px" src="${process.env.logo}">
        </td>
        </tr>
        <tr>
        <td>
        <h1 style="padding-top:25px; color:#630E2B">Email Confirmation</h1>
        </td>
        </tr>
        <tr>
        <td>
        <p style="padding:0px 100px;">
        </p>
        </td>
        </tr>
        <tr>
        <td>
        <a href="${link}" style="margin:10px 0px 30px 0px;border-radius:4px;padding:10px 20px;border: 0;color:#fff;background-color:#630E2B; ">Verify Email address</a>
        </td>
        </tr>
        <tr>
        <td>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <a href="${rfLink}" style="margin:10px 0px 30px 0px;border-radius:4px;padding:10px 20px;border: 0;color:#fff;background-color:#630E2B; ">Request new  esmail </a>
        </td>
        </tr>
        </table>
        </td>
        </tr>
        <tr>
        <td>
        <table border="0" width="100%" style="border-radius: 5px;text-align: center;">
        <tr>
        <td>
        <h3 style="margin-top:10px; color:#000">Stay in touch</h3>
        </td>
        </tr>
        <tr>
        <td>
        <div style="margin-top:20px;">
    
        <a href="${process.env.facebookLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
        <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35062_erj5dx.png" width="50px" hight="50px"></span></a>
        
        <a href="${process.env.instegram}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
        <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35063_zottpo.png" width="50px" hight="50px"></span>
        </a>
        
        <a href="${process.env.twitterLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;;color:#fff;border-radius:50%;">
        <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group_35064_i8qtfd.png" width="50px" hight="50px"></span>
        </a>
    
        </div>
        </td>
        </tr>
        </table>
        </td>
        </tr>
        </table>
        </body>
        </html>`

    if (! await sendEmail({ to: email, subject: 'Confirmation-Email', html })) {
        return next(new Error("Email Rejected"))
    }

    return res.status(200).json({ message: "<p>Done Sent New Confrim Email</p>" })
}

// //pass secret very bt3 token same SecretConfirm


export const login = asyncHandler(async (req, res, next) => {

    const { email, password } = req.body;
    //check email exist
    const user = await userModel.findOne({ email: email.toLowerCase() })
    if (!user) {
        return next(new Error("Email  not exist", { cause: 404 }))
    }

    if (!user.confirmEmail) {
        return next(new Error("Please confirm your email", { cause: 400 }))
    }
    if (!compare({ plaintext: password, hashValue: user.password })) {
        return next(new Error("In-valid login data", { cause: 400 }))
    }
    const access_token = generateToken({ payload: { id: user._id, role: user.role }, expiresIn: 30 * 60 })
    const refresh_token = generateToken({ payload: { id: user._id, role: user.role }, expiresIn: 60 * 60 * 24 * 365 })

    user.status = 'Online'
    await user.save()
    return res.status(201).json({ message: "Done", access_token, refresh_token })
})



export const sendCode = asyncHandler(async (req, res, next) => {

    const { email } = req.body
    const nanoId = customAlphabet('123456789', 4)

    const user = await userModel.findOneAndUpdate({ email: email.toLowerCase() }, { forgetCode: nanoId() }, { new: true })
    if (!user) {
        return next(new Error('Not register account', { cause: 404 }))
    }
    const html = `<!DOCTYPE html>
    <html>
    <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></head>
    <style type="text/css">
    body{background-color: #88BDBF;margin: 0px;}
    </style>
    <body style="margin:0px;"> 
    <table border="0" width="50%" style="margin:auto;padding:30px;background-color: #F3F3F3;border:1px solid #630E2B;">
    <tr>
    <td>
    <table border="0" width="100%">
    <tr>
    <td>
    <h1>
        <img width="100px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670702280/Group_35052_icaysu.png"/>
    </h1>
    </td>
    <td>
    <p style="text-align: right;"><a href="http://localhost:4200/#/" target="_blank" style="text-decoration: none;">View In Website</a></p>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    <tr>
    <td>
    <table border="0" cellpadding="0" cellspacing="0" style="text-align:center;width:100%;background-color: #fff;">
    <tr>
    <td style="background-color:#630E2B;height:100px;font-size:50px;color:#fff;">
    <img width="50px" height="50px" src="${process.env.logo}">
    </td>
    </tr>
    <tr>
    <td>
    <h1 style="padding-top:25px; color:#630E2B">Reset password</h1>
    </td>
    </tr>
    <tr>
    <td>
    <p style="padding:0px 100px;">
    </p>
    </td>
    </tr>
    <tr>
    <td>
    <p style="margin:10px 0px 30px 0px;border-radius:4px;padding:10px 20px;border: 0;color:#fff;background-color:#630E2B; ">${user.forgetCode}</p>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    <tr>
    <td>
    <table border="0" width="100%" style="border-radius: 5px;text-align: center;">
    <tr>
    <td>
    <h3 style="margin-top:10px; color:#000">Stay in touch</h3>
    </td>
    </tr>
    <tr>
    <td>
    <div style="margin-top:20px;">

    <a href="${process.env.facebookLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
    <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35062_erj5dx.png" width="50px" hight="50px"></span></a>
    
    <a href="${process.env.instegram}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
    <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35063_zottpo.png" width="50px" hight="50px"></span>
    </a>
    
    <a href="${process.env.twitterLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;;color:#fff;border-radius:50%;">
    <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group_35064_i8qtfd.png" width="50px" hight="50px"></span>
    </a>

    </div>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    </table>
    </body>
    </html>`

    if (! await sendEmail({ to: email, subject: 'Forget Password', html })) {
        return res.status(400).json({ message: "Email Rejected" })
    }
    return res.status(200).json({ message: "Done" })

})

export const forgetpassword = asyncHandler(async (req, res, next) => {

    const { email, forgetCode, password } = req.body

    const user = await userModel.findOne({ email: email.toLowerCase() })
    if (!user) {
        return next(new Error('Not register account', { cause: 404 }))
    }
    if (user.forgetCode != parseInt(forgetCode)) {
        return next(new Error('In-valid code', { cause: 400 }))
    }
    user.password = hash({ plaintext: password })
    user.forgetCode = null
    // 3mlnh user.changePasswordTime = Date.now() 3shn lwo forget password le moda
    user.changePasswordTime = Date.now()
    await user.save()
    return res.status(200).json({ message: "Done" })

})
