const express = require('express')
const router = express.Router()

const SMSController = require('../Controllers/SMSController')

router.get('/',SMSController.index)
router.post('/show',SMSController.show)
router.post('/store',SMSController.store)
router.post('/update',SMSController.update)
router.post('/delete',SMSController.destroy)

module.exports = router