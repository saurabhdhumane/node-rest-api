const mongoose = require('mongoose')

const filterSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other'] // Add other genders if needed
    },
    ip_address: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(\d{1,3}\.){3}\d{1,3}$/.test(v);
            },
            message: props => `${props.value} is not a valid IP address!`
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('filters', filterSchema)