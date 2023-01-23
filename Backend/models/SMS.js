const mongoose = require('mongoose')
const paginate = require('mongoose-paginate-v2')

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

SMSSchema.plugin(paginate)

module.exports = mongoose.model('SMS', SMSSchema)