const express = require('express')
const router = express.Router()

const SMSController = require('../Controllers/SMSController')
const {checkUser} = require('../Middlewares/AuthMiddleware')

router.use(checkUser)  //Protect all the routes of this router by a middleware

router.get('/', SMSController.getAll)
router.get('/getSent/:userEmail', SMSController.getSent)
router.get('/getReceived/:userEmail', SMSController.getReceived)
router.post('/send', SMSController.send)

module.exports = router