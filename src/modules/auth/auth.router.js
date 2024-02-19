import { validation } from '../../middleware/validation.js';
import * as authController from './controller/registration.js'
import * as validators from './auth.validation.js'


import { Router } from "express";
const router = Router();


router.post("/signup", validation(validators.signup), authController.signup)
router.get("/confirmEmail/:token", validation(validators.token), authController.confirmEmail)
router.get("/newConfirmEmail/:token", validation(validators.token), authController.ReqNewconfirmEmail)
router.post("/login", validation(validators.login), authController.login)
router.patch("/sendCode", validation(validators.sendCode), authController.sendCode)
router.patch("/forgetpassword", validation(validators.forgetpassword), authController.forgetpassword)


export default router