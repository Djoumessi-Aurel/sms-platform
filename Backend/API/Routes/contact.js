const express = require('express')
const router = express.Router()

const ContactController = require('../Controllers/ContactController')

router.get('/', ContactController.getAll)
router.get('/:userEmail', ContactController.getSomeones)
router.post('/create', ContactController.create)
router.put('/update', ContactController.update)
router.delete('/delete/:contactId', ContactController.destroy)

module.exports = router