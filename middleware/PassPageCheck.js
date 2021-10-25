const express = require("express");
const app = express();
const User = require("../model/userSchema");
// const Otp = require("../model/otp");

const PassPageCheck =  async(req, res, next) => {
    try {
        const accountNo = await req.cookies.ihchangepasswordok;

        if (!accountNo) {
            res.status(500).json({error: "Sorry! Something Went Wrong Please Try Again"});
        }
        const user = await User.findOne({ accountNo });
        const DBAccNo = await user.accountNo;
        if (user) {
            req.passuser = DBAccNo;
        } else {
            res.status(500).json({error: "Sorry! Something Went Wrong Please Try Again"});
        }
        

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Sorry! Something Went Wrong Please Try Again"});
    }

    next();
}

module.exports = PassPageCheck;