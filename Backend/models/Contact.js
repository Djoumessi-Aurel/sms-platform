const mongoose = require('mongoose')
const paginate = require('mongoose-paginate-v2')

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

contactSchema.plugin(paginate)

module.exports = mongoose.model('Contact', contactSchema)
