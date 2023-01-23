const User = require('../../models/User')
const jwt = require('jsonwebtoken')

const secret = process.env.MY_SECRET

//To check if the user is connected
module.exports.checkUser = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1]
		const isCustomAuth = token.length < 500
	
		let decodedData
	
		if (token && isCustomAuth) {      
		  decodedData = jwt.verify(token, secret)
	
		  req.userId = decodedData?.id
		} else {
		  decodedData = jwt.decode(token)
	
		  req.userId = decodedData?.sub
		}    
	
		next()
	  } catch (error) {
		console.log(error.name, error.message)
	  }
}