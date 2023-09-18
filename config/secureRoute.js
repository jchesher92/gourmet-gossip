import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import { Unauthorised } from '../utils/errors.js'


export const secureRoute = async (req, res, next) => {

  try {
    if (!req.headers.authorization) throw new Unauthorised('Missing authorization header')

    const token = req.headers.authorization.replace('Bearer ', '')

    const { sub: userId } = jwt.verify(token, process.env.SECRET)

    const foundUser = await User.findById(userId)

    if (!foundUser) {
      throw new Unauthorised('User not found')
    }

    req.user = foundUser

    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({ error: 'Unauthorized' })
  }
}