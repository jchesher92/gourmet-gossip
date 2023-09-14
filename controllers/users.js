import User from '../models/user.js'
import jwt from 'jsonwebtoken'

// ! Register route
// Endpoint: /register
export const registerUser = async (req, res) => {
  try {
    const user = await User.create(req.body)
    return res.status(201).json({ message: `Welcome ${user.username}` })
  } catch (error) {
    console.log(error)
    return res.status(422).json(error)
  }
}

// ! Login route
// Endpoint: /login
export const loginUser = async (req, res) => {

  const { email, password } = req.body

  try {
    // search the database for the user by the email provided
    const userToLogin = await User.findOne({ email: email })

    // If email doesn't match any users, throw an error
    if (!userToLogin) throw new Error('User not found')

    if (!userToLogin.validatePassword(password)) {
      throw new Error('Password invalid')
    }

    // If they match, then send token
    const token = jwt.sign({ sub: userToLogin._id }, process.env.SECRET, { expiresIn: '7d' })

    return res.json({ message: `Welcome back, ${userToLogin.username}!`, token: token })
  } catch (error) {
    console.log(error)
    return res.status(401).json({ error: 'Unauthorized' })
  }
}

export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id).populate('recipesAdded')
  return res.json(user)
}