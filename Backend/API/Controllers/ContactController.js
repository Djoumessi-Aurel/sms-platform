const Contact = require('../../models/Contact')
const User = require('../../models/User')

// get all contacts
const getAll = (req, res)=>{
    let options = { pagination: false, sort: {name: 1}}
    if(req.query.page && req.query.limit) options = {page: req.query.page, limit: req.query.limit}
    options.populate = 'owner'

    Contact.paginate({}, options)
    .then((response)=>{
        res.status(200).json(response)
    })
    .catch((error)=>{
        res.status(401).json({message: 'An error occured.', content: error.message})
    })
}

// get someone's contacts
const getSomeones = async (req, res)=>{
    try {
    let user = await User.findOne({email: req.params.userEmail})
    if(!user) throw new Error(`User with email ${req.params.userEmail} does not exist`)

    let options = { pagination: false, sort: {name: 1}}
    if(req.query.page && req.query.limit) options = {page: req.query.page, limit: req.query.limit}
    
    let response = await Contact.paginate({owner: user._id}, options)
    res.status(200).json(response)

    } catch (error) {
    res.status(401).json({message: 'An error occured.', content: error.message})
    }
}

// create a contact
const create = async (req, res)=>{
    try {
    const {name, phone, ownerId} = req.body
    let user = await User.findById(ownerId)
    if(!user) throw new Error(`User ${ownerId} does not exist`)
    
    let response = await Contact.create({name, phone, owner: user._id})
    res.status(200).json({message: 'Contact successfully created', content: response})

    } catch (error) {
    res.status(401).json({message: 'An error occured.', content: error.message})
    }
}

// create many contacts
const createMany = async (req, res)=>{
    try {
    const {contactsArray} = req.body
    
    let response = await Contact.create(contactsArray)
    res.status(200).json({message: 'Contacts successfully created', content: response})

    } catch (error) {
    res.status(401).json({message: 'An error occured.', content: error.message})
    }
}

// update a contact
const update = async (req, res)=>{
    try {
    const {name, phone, contactId} = req.body
    let contact = await Contact.findById(contactId)
    if(!contact) throw new Error(`Contact ${contactId} does not exist`)
    
    if(name) contact.name = name
    if(phone) contact.phone = phone
    
    let response = await contact.save()
    res.status(200).json({message: 'Contact successfully updated', content: response})

    } catch (error) {
    res.status(401).json({message: 'An error occured.', content: error.message})
    }
}

// delete a contact
const destroy = async (req, res)=>{
    try {
    const {contactId} = req.params
    let response = await Contact.findByIdAndDelete(contactId)
    res.status(200).json({message: 'Contact successfully deleted', content: response})

    } catch (error) {
    res.status(401).json({message: 'An error occured.', content: error.message})
    }
}

module.exports = {getAll, getSomeones, create, createMany, update, destroy}