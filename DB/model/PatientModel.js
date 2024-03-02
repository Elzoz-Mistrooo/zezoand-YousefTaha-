import mongoose, { Schema, Types } from 'mongoose'
import userSchema from './User.model.js';
const patientSchema = new Schema({


    ...userSchema,
    medicalappointments: [{
        type: Types.ObjectId, ref: "Appointment",
        required: true
    }
    ],
    medicalHistory: {
        type: String,
        required: true
    },
    insuranceDetails: {
        type: String,
        required: true
    },

    // id: { type: Number, default: 0, unique: true },
    diseases: {
        type: Array,
        default: []
    },

    // doctorId: { type: Types.ObjectId, ref: 'Doctor', required: true },


}, { timestamps: true })
const PatientModel = mongoose.model('Patient', patientSchema);

export default PatientModel