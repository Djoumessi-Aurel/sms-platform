const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    owner: {                //The user who owns this contact
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    
}, { 
    timestamps: true
    })

module.exports = mongoose.model('Contact', contactSchema)
