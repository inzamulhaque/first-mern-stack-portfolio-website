const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const otpSchema = new mongoose.Schema({
    accountNo: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: Number,
        required: true,
        unique: true
    },
    extime: {
        type: Number,
        required: true
    }
});

const Otp = mongoose.model("OTP", otpSchema, "otp");

module.exports = Otp;