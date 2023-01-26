const SMS = require('../../models/SMS')
const User = require('../../models/User')
const axios = require('axios')

// get all SMS
const getAll = (req, res)=>{
    let options = { pagination: false}
    if(req.query.page && req.query.limit) options = {page: req.query.page, limit: req.query.limit}
    options.populate = 'sender'

    SMS.paginate({}, options)
    .then((response)=>{
        res.status(200).json(response)
    })
    .catch((error)=>{
        res.status(401).json({message: 'An error occured.', content: error.message})
    })
}

// get someone's sent SMS
const getSent = async (req, res)=>{
    try {
    let user = await User.findOne({email: req.params.userEmail})
    if(!user) throw new Error(`User with email ${req.params.userEmail} does not exist`)

    let options = { pagination: false, }
    if(req.query.page && req.query.limit) options = {page: req.query.page, limit: req.query.limit}
    
    let response = await SMS.paginate({sender: user._id}, options)
    res.status(200).json(response)

    } catch (error) {
    res.status(401).json({message: 'An error occured.', content: error.message})
    }
}

// get someone's received SMS
const getReceived = async (req, res)=>{
    try {
    let user = await User.findOne({email: req.params.userEmail})
    if(!user) throw new Error(`User with email ${req.params.userEmail} does not exist`)
    if(!user.phone) throw new Error(`User with email ${req.params.userEmail} does not have a phone number`)

    let options = { pagination: false, }
    if(req.query.page && req.query.limit) options = {page: req.query.page, limit: req.query.limit}
    options.populate = 'sender'

    let response = await SMS.paginate({receivers: user.phone}, options)
    res.status(200).json(response)

    } catch (error) {
    res.status(401).json({message: 'An error occured.', content: error.message})
    }
}

// send a SMS
const send = async (req, res)=>{
    try {
    let {content, sender, receivers} = req.body
	receivers = [...new Set(receivers)]; //eliminate duplicates in the receiver list
	
    let user = await User.findById(sender)
    if(!user) throw new Error(`User ${sender} does not exist`)

    let finalReceivers = []
    //Using the external API to send SMS
    for(let receiver of receivers){
        try {
            /*let res = await axios.post(process.env.SEND_SMS_URL, { phoneNumber: receiver, message: content }, {
            headers: {
                'Authorization': process.env.SMS_TOKEN
            }
        })*/
        console.log('Résultat de la requête:', res)
        finalReceivers.push(receiver)

        } catch (error) {
            console.log(error.message)
        }
    }

    if(finalReceivers.length === 0) throw new Error('All sendings failed. Final receivers array is empty')
    
    let response = await SMS.create({content, sender, receivers: finalReceivers})
    res.status(200).json({message: 'Message successfully sent', content: response})

    } catch (error) {
    res.status(401).json({message: 'An error occured.', content: error.message})
    }
}


module.exports = {getAll, getSent, getReceived, send}