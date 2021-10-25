const express = require("express");
const app = express();
const User = require("../model/userSchema");
const Otp = require("../model/otp");

app.use(express.json());

const AuthEmailVer = async(req, res, next) => {
    try {
        const accountNo = await req.cookies.ihporuseremail;

        const userAccountNo = await User.findOne({ accountNo });
        const otpAccountNo = await Otp.findOne({ accountNo });

        if (!userAccountNo || !otpAccountNo) {
            req.userStatus =  "Invalid Account";
        }
        
        req.otpUser = otpAccountNo;

    } catch (error) {
        console.log(error);
        res.status(401).send("Unauthorized Email!");
    }

    next();
}

module.exports = AuthEmailVer;