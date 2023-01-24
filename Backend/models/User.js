const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true, //email used for password recovery
        unique: true,
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email address.',
          ],
    },
    phone: {
        type: String,
    },

}, { 
    timestamps: true
    })

module.exports = mongoose.model('User', userSchema)
