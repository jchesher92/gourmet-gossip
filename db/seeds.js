import mongoose from 'mongoose'
import 'dotenv/config'

// Model
import Recipe from '../models/recipe.js'
import User from '../models/user.js'

// Data
import recipesData from './data/recipes.js'
import userData from './data/users.js'
import reviewsData from './data/reviews.js'

const seedDatabase = async () => {
  try {
    // Connect to DB
    await mongoose.connect(process.env.CONNECTION_STRING)
    console.log('🚀 Database connection established')

    // Delete all the documents from all of our collections
    const { deletedCount: usersDeleted } = await User.deleteMany()
    console.log(`❌ Deleted ${usersDeleted} documents from the users collection`)

    // Delete all the documents from all of our collections
    const { deletedCount: recipesDeleted } = await Recipe.deleteMany()
    console.log(`❌ Deleted ${recipesDeleted} documents from the recipes collection`)

    // Input the userData we've imported into the database as individual documents
    const usersAdded = await User.create(userData)
    console.log(`🌱 Seeded ${usersAdded.length} documents into the users collection`)
    //  Add a random user to each of the reviews
    const reviewsWithAddedBy = reviewsData.map(review => {
      const randomUserId = Math.floor(Math.random() * usersAdded.length)
      return { ...review, addedBy: usersAdded[randomUserId]._id }
    })

    // Just before adding recipes into the database, we'll add a addedBy field, with a user id as the value
    const recipesWithAddedBy = recipesData.map(recipe => {
      const randomUserId = Math.floor(Math.random() * usersAdded.length)
      const randomReview = Math.floor(Math.random() * reviewsWithAddedBy.length)
      return { ...recipe, addedBy: usersAdded[randomUserId]._id, reviews: reviewsWithAddedBy[randomReview] }
    })

    console.log(usersAdded[0])

    // Input the recipesData we've imported into the database as individual documents
    const recipesAdded = await Recipe.create(recipesWithAddedBy)
    console.log(`🌱 Seeded ${recipesAdded.length} documents into the recipes collection`)

    // Close our connection to the database
    await mongoose.connection.close()
    console.log('👋 Database connection closed')
  } catch (error) {
    console.log(error)
    // Close our connection to the database
    await mongoose.connection.close()
    console.log('👋 Database connection closed')
  }
}
seedDatabase()