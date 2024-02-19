import mongoose, { Schema, Types, model } from "mongoose"
import userSchema from "./User.model.js";
const doctorSchema = new Schema(
    {


        ...userSchema,



        specialties: {
            type: String,
            required: [true, "specialization is require"],
        },
        qualifications: {
            type: String,
            required: [true, "infromation about octor is require"],
        },

        appointment: {
            type: String,
            required: [false, "Appointment about octor is require"],
        },
        section: {
            type: String,
            require: true
        },

        experience: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }



    },
    { timestamps: true }
);

const doctorModel = mongoose.model.doctor || model("doctor", doctorSchema);
export default doctorModel
