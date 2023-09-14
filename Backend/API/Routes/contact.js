const express = require('express')
const router = express.Router()

const ContactController = require('../Controllers/ContactController')
const {checkUser} = require('../Middlewares/AuthMiddleware')

router.use(checkUser)  //Protect all the routes of this router by a middleware

router.get('/', ContactController.getAll)
router.get('/:userEmail', ContactController.getSomeones)
router.post('/create', ContactController.create)
router.post('/createMany', ContactController.createMany)
router.put('/update', ContactController.update)
router.delete('/delete/:contactId', ContactController.destroy)

module.exports = router