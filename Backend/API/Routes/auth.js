const express = require('express')
const router = express.Router()

const AuthController = require('../Controllers/AuthController')
const {checkUser} = require('../Middlewares/AuthMiddleware')

router.post("/", checkUser)
router.post("/register", AuthController.register)
router.post("/login", AuthController.login)
router.post("/login-with-tok", AuthController.loginWithToken)
router.post("/forgot-password", AuthController.forgotPassword)
router.get("/reset-password/:id/:token", AuthController.beforeResetPassword)
router.post("/reset-password/:id/:token", AuthController.resetPassword)

module.exports = router