const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate (value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email Is Invalid");
            }
        }
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "not verify"
    },
    accountNo: {
        type: String,
        required: true,
        unique: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now()
    }
});

// password hashing
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;

    } catch (error) {
        console.log(error);
    }
}

const User = mongoose.model("USER", userSchema);

module.exports = User;