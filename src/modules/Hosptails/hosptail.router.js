// import { validation } from '../../middleware/validation.js'
// import *as validators from './user.validation.js'

import * as HosptailController from './controller/hosptail.js'
import { Router } from "express";
const router = Router()






router.post("/addhosptail", HosptailController.addHosptail)
router.delete("/hospitaldelete/:id", HosptailController.Deleteuselesshospital)




export default router