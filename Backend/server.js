// Importing libraries
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors');


// Configuring environment variables
dotenv.config({
    path : "./API/config/.env"
})

// Importing routes
const AuthRoute = require('./API/Routes/auth')
const SMSRoute = require('./API/Routes/sms')
const ContactRoute = require('./API/Routes/contact')

// Connexion to the database
// const DBURL = process.env.DBURL || 'mongodb://localhost:27017/sms-platform'
const DBURL = process.env.DBURL || 'mongodb+srv://user-aurel:amCgrWF32p0rTXts@cluster0.swo0hmy.mongodb.net/sms-platform?retryWrites=true&w=majority'
mongoose.set('strictQuery', true)

mongoose.connect(DBURL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.once('open', ()=>{
    console.log('Database Connection Established!')
})

db.on('error', (err)=>{
    console.log(err)
})


// express server creation
const app = express()
app.use(cors()); //To permit cross-origin requests

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const PORT = process.env.PORT || 8080

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}...`)
})


// Using routes in the server
app.use('/api/auth', AuthRoute)
app.use('/api/sms', SMSRoute)
app.use('/api/contact', ContactRoute)
