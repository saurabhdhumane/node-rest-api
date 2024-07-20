const mongoose = require('mongoose');
const validator = require('validator')

const userAuth = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is Required"],
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        validate: [validator.isEmail, "please provide correct email address"],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Please Enter password"],
        minlength: [6, 'password length should be greater than 6 character']
    }
}, { timestamps: true })

module.exports = mongoose.model('UserAuth', userAuth)