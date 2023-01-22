const mongoose = require('mongoose')

const SMSSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    sender: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'User'
    },
    receivers: [String], //Array containing phone numbers
    
}, { 
    timestamps: true
    })

module.exports = mongoose.model('SMS', SMSSchema)
