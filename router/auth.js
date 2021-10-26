const express = require("express");
const Router = express.Router();
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");
require("../db/conn");
const User = require("../model/userSchema");
const Otp = require("../model/otp");
const AuthEmailVer = require("../middleware/authEmailVer");
const AuthForgot = require("../middleware/authForgot");
const PassPageCheck = require("../middleware/PassPageCheck");
const Checklogin = require("../middleware/Checklogin");

const mail = async (user_mail, subject, msg) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.GMAIL,
          pass: process.env.GEMAIL_PASSWORD,
        },
      });

      let info = await transporter.sendMail({
        from: process.env.GMAIL,
        to: user_mail,
        subject: subject,
        html: msg
      });
    }


Router.post("/userSignup", async(req, res) => {
    const { name, email, phone, address, password, confirm_password } = req.body;
    const user_otp = Math.floor(Math.random() * 999999);
    const accountNo = `acno${Math.floor(Math.random() * 9999999999999)}`;
    const subject = "Verify Your Email";
    const msg = `Hi! ${name}, your otp is <b style="color: #274BFC">${user_otp}</b>, This otp valid just 5 minute`;

    if ( !name || !email || !phone || !address || !password || !confirm_password ) {
        return res.status(422).json({error: "please fild all data"});
    }

    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(500).json({error: "This mail already exist"});
        } else if (password !== confirm_password) {
            return res.status(422).json({error: "Password and confirm password are not some"});
        } else {
            let extime = new Date().getTime() + (300 * 1000);
            await mail(email, subject, msg);
            const user = new User({ name, email, phone, address, password, accountNo });
            const otp = new Otp({accountNo, otp: user_otp, extime});
            await otp.save();
            await user.save();
            res.cookie("ihporuseremail", accountNo, {
                expires: new Date(Date.now() + (900*1000)),
                httpOnly: true
            });
            res.status(201).json({message: "Sign Up successful"});
        }


    } catch (error) {
        console.log(error);
    }

});

Router.get("/emailverAuth", AuthEmailVer, (req, res) => {
    res.send(req.otpUser);
    if (req.userStatus) {
        res.status(401).send(req.userStatus);
    }
});

Router.patch("/verifed", async(req, res) => {
    try {
        const accountNo = await req.cookies.ihporuseremail;

        const user = await User.updateOne({ accountNo }, {
            $set: { status: "verifed" }
        });

        const otp = await Otp.deleteOne({ accountNo });
        res.clearCookie("ihporuseremail");

        if (user) {
            res.status(204).json({message: "Email Verifed"});
        } else {
            res.status(400).json({error: "Email Not Verifed"});
        }

    } catch (error) {
        console.log(error);
    }
    
});

Router.patch("/reSent", async(req, res) => {
    try {
        const accountNo = await req.cookies.ihporuseremail;
        const user = await User.findOne({ accountNo });
        await Otp.deleteOne({ accountNo });
        const user_otp = Math.floor(Math.random() * 999999);
        let extime = new Date().getTime() + (300 * 1000);
        const name = await user.name;
        const email = await user.email;
        const subject = "OTP Resent";
        const msg = `Hi! ${name}, your otp is <b style="color: #274BFC">${user_otp}</b>, This otp valid just 5 minute`;
        await mail(email, subject, msg);
        const otp = new Otp({accountNo, otp: user_otp, extime});
        await otp.save();

        res.status(204).json({message: "OTP Resent"});
    } catch (error) {
        console.log(error);
    }
});

Router.post("/signin", async(req, res) => {
    try {
        const { email, password } = req.body;
        if ( !email || !password ) {
            return res.status(422).json({error: "fild data"});
        }

        const userLogin = await User.findOne({ email: email });

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            if (isMatch) {
                if (userLogin.status == "verifed") {
                    let token = await userLogin.generateAuthToken();

                    res.cookie("ihwebtoken", token, {
                        expires: new Date(Date.now() + 2592000000),
                        httpOnly: true
                    });
                    res.status(200).json({ message: "User Singin" });


                } else if (userLogin.status == "not verify") {

                    const user = userLogin;
                    await Otp.deleteOne({ accountNo: user.accountNo });
                    const user_otp = Math.floor(Math.random() * 999999);
                    let extime = new Date().getTime() + (300 * 1000);
                    const name = await user.name;
                    const subject = "OTP Resent";
                    const msg = `Hi! ${name}, your otp is <b style="color: #274BFC">${user_otp}</b>, This otp valid just 5 minute`;
                    await mail(email, subject, msg);
                    const otp = new Otp({accountNo: user.accountNo, otp: user_otp, extime});
                    await otp.save();

                    res.cookie("ihporuseremail", user.accountNo, {
                        expires: new Date(Date.now() + (600*1000)),
                        httpOnly: true
                    });

                    res.status(201).json({resent: "OTP Resent"});

                } else {
                    res.status(400).json({ error: "Your Account Suspended" });
                }

            } else {
                res.status(400).json({ error: "Incorrect Password" });
            }

        } else {
            res.status(400).json({ error: "This Email Not Exist" });
        }

    } catch (error) {
        console.log(error);
    }
});

Router.post("/forgot", async(req, res) => {
    const email = req.body.email;
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            const name = await user.name;
            const accountNo = user.accountNo;
            await Otp.deleteOne({ accountNo });
            const user_otp = Math.floor(Math.random() * 999999);
            let extime = new Date().getTime() + (300 * 1000);
            const subject = "Forgot Your Password";
            const msg = `Hi! ${name}, your otp is <b style="color: #274BFC">${user_otp}</b>, This otp valid just 5 minute`;
            await mail(email, subject, msg);
            const otp = new Otp({accountNo: user.accountNo, otp: user_otp, extime});
            await otp.save();

            res.cookie("ihmernstackforgot", accountNo, {
                expires: new Date(Date.now() + (600*1000)),
                httpOnly: true
            });

            res.status(201).json({ message: "OTP Sended" });

        } else {
            res.status(400).json({ error: "This Email Not Exist" });
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "This Email Not Exist" });
    }
});

Router.get("/forgotvelidcheck", AuthForgot, (req, res) => {
    res.send(req.otpUser);
    if (req.userStatus) {
        res.status(401).send(req.userStatus);
    }
});

Router.patch("/reSentOtp", async(req, res) => {
    try {
        const accountNo = await req.cookies.ihmernstackforgot;
        const user = await User.findOne({ accountNo });
        await Otp.deleteOne({ accountNo });
        const user_otp = Math.floor(Math.random() * 999999);
        let extime = new Date().getTime() + (300 * 1000);
        const name = await user.name;
        const email = await user.email;
        const subject = "OTP Resent";
        const msg = `Hi! ${name}, your otp is <b style="color: #274BFC">${user_otp}</b>, This otp valid just 5 minute`;
        await mail(email, subject, msg);
        const otp = new Otp({accountNo, otp: user_otp, extime});
        await otp.save();

        res.status(204).json({message: "OTP Resent"});
    } catch (error) {
        console.log(error);
    }
});

Router.post("/ceckOTP", async(req, res) => {
    try {
        const getOtp = req.body.otp;
        const accountNo = req.cookies.ihmernstackforgot;
        const otpUser = await Otp.findOne({ accountNo, otp: getOtp });
        const db_otp = otpUser.otp;

        const time = Date.now() - otpUser.extime;

        if (time < 0) {
            if (db_otp == getOtp) {
                res.cookie("ihchangepasswordok", accountNo, {
                    expires: new Date(Date.now() + (180*1000)),
                    httpOnly: true
                });
                res.status(200).json({ message: "OTP Match" });
            }

        } else {
            res.status(404).json({ timeOut: "Time Over! Please Resent OTP" });
        }

        if (!otpUser) {
            res.status(500).json({ error: "Invalid OTP! Please Enter Valid OTP" });
        }

    } catch (error) {
        res.status(500).json({ error: "Invalid OTP! Please Enter Valid OTP" });
    }
});

Router.get("/passpagecheck", PassPageCheck, (req, res) => {
    res.json(req.passuser);
});

Router.patch("/updatepass", async(req, res) => {
    try {
        const { userdata, newpassword } = req.body;
        const password = await bcrypt.hash(newpassword, 12);
        await Otp.deleteOne({ userdata });
        const user = await User.updateOne({ accountNo: userdata }, {
            $set: { password: password }
        });

        const findUser = await User.findOne({ accountNo: userdata });
        const { email, name } = await findUser;
        let msg = `<h3> Hello, <b style="color: #274BFC"> ${name} </b>! Your Password Updated Successfully. </h3>`;

        res.clearcookie("ihchangepasswordok", {path: "/"});
        res.clearcookie("ihmernstackforgot", {path: "/"});

        mail(email, "Password Updated", msg)

        res.status(204).json({message: "Password Updated"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Password Updated Failed"});
    }
});

Router.post("/sendmsg", async(req, res) => {
    const { name, email, phone, subject, message } = req.body;
    try {
        const conSub = "Your Message Received";
        const conMsg = `<h3 style="color: #274BFC"> Thanks ${name}! </h3> Your Phone Number: <b style="color: #274BFC"> ${phone} </b>. Thanks For Contact.`;
        const Msg = `<h1> Contact Message. </h1> <h3 style="color: #274BFC"> Name: ${name} </h3> <h3 style="color: #274BFC"> Email: ${email} </h3> </h3> <h3 style="color: #274BFC"> Phone Number: ${phone} </h3> <h3 style="color: #274BFC"> Subject: ${subject} </h3> <h5> Message: ${message} </h5>`;
        mail("mdihalif@yahoo.com", "Contact Message", Msg);
        mail(email, conSub, conMsg);

        res.status(200).json({ message: "Contact Successful" });

    } catch (error) {
        console.log(error);
    }
});

Router.get("/checklogin", Checklogin, (req, res) => {
    res.json(req.rootUser);
});

Router.get("/logout", async(req, res) => {
    try {
        const token = req.cookies.ihwebtoken;
        const user = await User.findOne({ "tokens.token": token });

        user.tokens = user.tokens.filter((currItems) => {
            return currItems.token !== token;
        });

        await user.save();

        res.clearCookie("ihwebtoken");
        res.json({message: "logout"});

    } catch (error) {
        console.log(error);
    }
});

Router.get("/logoutall", async(req, res) => {
    try {
        const token = req.cookies.ihwebtoken;
        const user = await User.findOne({ "tokens.token": token });

        user.tokens = [];

        await user.save();

        res.clearCookie("ihwebtoken");
        res.json({message: "logout"});

    } catch (error) {
        console.log(error);
    }
});

module.exports = Router;