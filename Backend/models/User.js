const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },

}, { 
    timestamps: true
    })

module.exports = mongoose.model('User', userSchema)
