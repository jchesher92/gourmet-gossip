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

    // Delete all the user documents from all of our collections
    const { deletedCount: usersDeleted } = await User.deleteMany()
    console.log(`❌ Deleted ${usersDeleted} documents from the users collection`)

    // Delete all the recipe documents from all of our collections
    const { deletedCount: recipesDeleted } = await Recipe.deleteMany()
    console.log(`❌ Deleted ${recipesDeleted} documents from the recipes collection`)

    // Input the userData we've imported into the database as individual documents
    const usersAdded = await User.create(userData)
    console.log(`🌱 Seeded ${usersAdded.length} documents into the users collection`)

    //  Go through all of the reviews and add a random user to the addedBy key
    const reviewsWithAddedBy = reviewsData.map(review => {
      const randomUserId = Math.floor(Math.random() * userData.length)
      return { ...review, addedBy: usersAdded[randomUserId]._id }
    })

    // Go through all of the recipes and add a random user to the addedBy key and a random review to the reviews key
    const recipesWithAddedBy = recipesData.map(recipe => {
      const randomUserId = Math.floor(Math.random() * userData.length)
      const randomReview = Math.floor(Math.random() * reviewsWithAddedBy.length)
      return { ...recipe, addedBy: usersAdded[randomUserId]._id, reviews: reviewsWithAddedBy[randomReview] }
    })

    // Add the recipes to the database as documents
    const recipesAdded = await Recipe.create(recipesWithAddedBy)
    console.log(`🌱 Seeded ${recipesAdded.length} documents into the recipes collection`)

    // Go through the 
    console.log(User)

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