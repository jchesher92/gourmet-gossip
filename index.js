import express from 'express'
import mongoose from 'mongoose'
import router from './config/routes.js'
import 'dotenv/config'

const app = express()

// Parse JSON body
app.use(express.json())

// ? Logger
app.use((req, res, next) => {
  console.log(`🚨 Request received: ${req.method} ${req.url}`)
  next()
})

// ! Specifc routes
app.use('/api', router)

// ?  Route Not Found
app.use((req, res) => {
  return res.status(404).json({ message: 'Route not found' })
})

const startServer = async () => {
  try {
    // Connect to the database
    await mongoose.connect(process.env.CONNECTION_STRING)
    console.log('🌱 Database connection established')
    // Listen
    app.listen(process.env.PORT, () => console.log(`🚀 Server listening on port ${process.env.PORT}`))
  } catch (error) {
    console.log('🆘 Something went wrong when starting the server')
    console.log(error)
  }
}
startServer()
