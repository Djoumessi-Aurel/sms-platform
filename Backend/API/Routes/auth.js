const express = require('express')
const router = express.Router()

const AuthController = require('../Controllers/AuthController')
const {checkUser} = require('../Middlewares/AuthMiddleware')

router.post("/", checkUser)
router.post("/register", AuthController.register)
router.post("/login", AuthController.login)
router.post("/recoverPassword", AuthController.recoverPassword)

module.exports = router