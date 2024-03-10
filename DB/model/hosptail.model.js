import  { Schema, model } from "mongoose";
//schema
//mongoose(model)


const hosptailSchema = new Schema({

    HosptailAdress:{type:String,required:true},
    HosptailName:{type:String,required:true},
    HosTelephone:{type:String,required:true}


},{timestamps:true}
)

export const hosptailModel=model('Hosptail',hosptailSchema)