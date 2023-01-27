const User = require('../../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodeoutlook = require('nodejs-nodemailer-outlook')

const secret = process.env.MY_SECRET

const login = async (req, res) => {
  const { email, password } = req.body
  
  try {
    const oldUser = await User.findOne({ email })

    if (!oldUser) return res.status(401).json({ message: "Wrong credentials" })

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)

    if (!isPasswordCorrect) return res.status(400).json({ message: "Wrong credentials" })

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "360h" })

    res.status(200).json({ result: oldUser, token })
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", content: err.message })
  }
}

// create an account
const register = async (req, res) => {
  const { name, email, phone, password } = req.body

  try {
    const oldUser = await User.findOne({email})

    if (oldUser) return res.status(401).json({ message: "User already exists" })

    const hashedPassword = await bcrypt.hash(password, 12)

    const result = await User.create({name, email, phone, password: hashedPassword})

    //const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } )

    res.status(201).json(result)
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", content: error.message })
    
    // console.log(error)
  }
}

// to ask for a reset password link
const forgotPassword = async (req, res) => {
    const { email } = req.body
  
    try {
      const user = await User.findOne({email})
  
      if (!user) return res.status(401).json({ message: "User does not exist" })
  
      const aSecret = secret + user.password
      const payload = {id: user._id, email: user.email}
      const token = jwt.sign(payload, aSecret, {algorithm: "HS256", expiresIn: 30*60,})
      // console.log('TOKEN =', token)
      const link = `${process.env.RESET_PASSWORD_URL}/${user._id}/${token}`

      let mailContent = `Click on the following link to reset your password. The link is valid for only 30 minutes.\n
       ${link}`
    
      await sendMail(user.email, mailContent)
  
      res.status(201).json({message: `A link has been sent to your email adress ${user.email}
      \ncheck it to reset your password.`})
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", content: error.message })
    //   console.log(error)
    }
  }

// reset password
const beforeResetPassword = async (req, res) => {

  try {
    const { id, token } = req.params
    let user = await User.findById(id)
    if (!user) return res.status(401).json({ message: "User does not exist" })

    const aSecret = secret + user.password
    const payload = jwt.verify(token, aSecret)
    res.status(201).json({message: `OK. You have the right to access this page`, content: payload})
    
  } catch (error) {
    res.status(401).json({ message: "Something went wrong", content: error.message })
  }
}

// reset password
const resetPassword = async (req, res) => {

  try {
    const { id, token } = req.params
    const {password} = req.body
    let user = await User.findById(id)
    if (!user) return res.status(401).json({ message: "User does not exist" })

    const aSecret = secret + user.password
    const payload = jwt.verify(token, aSecret)

    if(password) user.password = await bcrypt.hash(password, 12)
    await user.save()
    
    res.status(201).json({ message: "Password successfully reset", content: user })

  } catch (error) {
    res.status(401).json({ message: "Something went wrong", content: error.message })
  }
}

async function sendMail(receiver, content){
  return new Promise((resolve, reject)=>{
    nodeoutlook.sendEmail({
      auth: {
          user: "testprogweb12@outlook.com",
          pass: "alphabeta12"
      },
      from: 'testprogweb12@outlook.com',
      to: receiver,
      subject: 'Reset password',
      // html: '<b>This is bold text</b>',
      text: content,
      // replyTo: 'receiverXXX@gmail.com',
      onError: (e) => {reject(e) /*console.log('Erreur', e)*/},
      onSuccess: (i) => {resolve(i); console.log('Succès', i.envelope)}
    }
  )
  })
}


module.exports = {login, register, forgotPassword, beforeResetPassword, resetPassword}