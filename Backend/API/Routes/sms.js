const express = require('express')
const router = express.Router()

const SMSController = require('../Controllers/SMSController')

router.get('/', SMSController.getAll)
router.get('/getSent/:userEmail', SMSController.getSent)
router.get('/getReceived/:userEmail', SMSController.getReceived)
router.post('/send', SMSController.send)

module.exports = router