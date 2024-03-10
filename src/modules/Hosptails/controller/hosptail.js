import { hosptailModel } from "../../../../DB/model/hosptail.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";


export const addHosptail = asyncHandler(async (req, res, next) => {
    const { HosptailAdress, HosptailName, HosTelephone } = req.body
    const checkHosptail = await hosptailModel.findOne({ HosptailName })
    if (checkHosptail) {
        return next(new Error("You've Duplicated Name"))
    }
    const CreateHosptail = await hosptailModel.create({ HosptailAdress, HosptailName, HosTelephone })
    return res.json({ message: "Done", CreateHosptail })
})

export const Deleteuselesshospital=asyncHandler(async(req,res,next)=>{
    const{id}=req.params
    const checkThisId=await hosptailModel.findByIdAndDelete(id)
    if (!checkThisId) {
        return next(new Error("Youssef Taha's owner lazm yb2 mogod"))
    }
    return res.json({message:"DONE by YOUsef Taha+Zezo"})
})