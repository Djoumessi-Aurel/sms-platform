const User = require('../../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const secret = process.env.MY_SECRET

const login = async (req, res) => {
  const { email, password } = req.body
  
  try {
    const oldUser = await User.findOne({ email })

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" })

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" })

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

    res.status(201).json({result})
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", content: error.message })
    
    // console.log(error)
  }
}

// recover password
const recoverPassword = async (req, res) => {
    const { name, email, phone, password } = req.body
  
    try {
      const oldUser = await User.findOne({email})
  
      if (oldUser) return res.status(401).json({ message: "User already exists" })
  
      const hashedPassword = await bcrypt.hash(password, 12)
  
      const result = await User.create({name, email, phone, password: hashedPassword})
  
      //const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } )
  
      res.status(201).json({result})
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", content: error.message })
      
    //   console.log(error)
    }
  }

module.exports = {login, register, recoverPassword}