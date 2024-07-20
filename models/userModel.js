const mongoose = require('mongoose');
const validator = require('validator');

// Schema
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "Please provide first name"],
        lowercase: true,
        trim: true
    },
    last_name: {
        type: String,
        required: [true, "Please provide last name"],
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please provide an email address"],
        validate: [validator.isEmail, "Please provide a proper email address"],
        unique: true,
        lowercase: true,
        trim: true
    },
    address: {
        type: String,
        required: [true, "Please provide an address"],
        lowercase: true,
        trim: true
    }
}, {
    timestamps: true // Corrected option
});

module.exports = mongoose.model('User', userSchema);
