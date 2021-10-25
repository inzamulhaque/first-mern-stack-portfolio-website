const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const Checklogin =  async(req, res, next) => {
    try {
        const token = await req.cookies.ihwebtoken;
        const verifyToken = await jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await User.findOne({_id: verifyToken._id, "tokens.token": token});
        if (!rootUser) {
            throw new Error("User Not Found")
        }

        req.rootUser = rootUser;

    } catch (error) {
        console.log(error);
        res.status(401).send("Unauthorized token!");
    }

    next();
}

module.exports = Checklogin;