import mongoose, { Schema, model, Types } from "mongoose";

const userSchema = {

    firstName: String,
    lastName: String,

    userName: {
        type: String,
        required: [true, 'userName is Required'],
        min: [2, 'minimum length 2 char'],
        max: [20, 'max length 2 char'],
        lowercase: true
    },
    email: {
        type: String,
        required: [true, 'Email is Required'],
        unique: [true, 'Email should be Unique'],
        lowercase: true

    },
    password: {
        type: String,
        required: [true, 'password is Required']
    },
    phone: {
        type: String,

    },
    adress: {
        type: String
    },
    gender: {
        type: String,
        default: 'Male',
        enum: ['Male', 'Female']
    },
    DOB: String,
    image: Object,

    role: {
        type: String,
        default: 'User',
        enum: ['User', 'Admin']
    },

    status: {
        type: String,
        default: 'Offline',
        enum: ['Offline', 'Online', 'blocked']
    },
    confirmEmail: {
        type: Boolean,
        default: false
    },
    forgetCode: {
        type: Number,
        default: null
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },

    changePasswordTime: {
        type: Date
    },
    token: String



}


export default userSchema