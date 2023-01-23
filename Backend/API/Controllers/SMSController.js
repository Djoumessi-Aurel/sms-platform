const { response } = require('express')
const SMS = require('../../models/SMS')

//show the list of Sms

const index = (req, res, next) => {
    SMS.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured'
        })
    })
}

// show single sms
const show = (req, res, next) => {
    let smsID = req.body.smsID
    SMS.findById(smsID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured'
        })
    })

}

//  add new sms
const store = (req,res,next) => {
    let sms = new SMS({
        content: req.body.content,
        sender: req.body.sender,
        receivers: req.body.receivers
    })
    sms.save()
    .then(response => {
        res.json({
            message: 'Sms added succesfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured'
        })
    })
}

// update sms
const update = (req, res, next) => {
    let smsID =req.body.smsID

    let updatedData = {
        content: req.body.content,
        sender: req.body.sender,
        receivers:req.body.receivers
    }

    SMS.findByIdAndUpdate(smsID, {$set: updatedData})
    .then(() => {
        res.json({
            message: 'sms update sucessfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured'
        })
    })
}
// delete a sms
const destroy = (req, res, next) => {
    let smsID = req.body.smsID
    SMS.findByIdAndRemove(smsID)
    .then(() => {
        req.json({
            message: 'Deleted sucessfully'
        })
    })
    .catch(error => {
        req.json({
            message: 'An error occured'
        })
    })
}

module.exports = {
    index, show, store, update, destroy
}