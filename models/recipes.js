// ! Imports
import mongoose from 'mongoose'
import User from './users.js'


// ! Recipe Schema

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  diet: { type: String, required: true },
  difficulty: { type: String, required: true },
  time: { type: Number, required: true },
  method: { type: String, required: true },
  serves: { type: Number, required: true },
  ingredients: [{ type: String }],
  image: { type: String, required: true },
  author: { type: String, required: true },
  reviews: {
    type: mongoose.ObjectId,
    ref: 'Reviews'
  }
})

const reviewsSchema = new mongoose.Schema({
  rating: { type: Number },
  author: { type: User },
  comment: { type: String }
})

export default mongoose.model('Recipe', recipeSchema)
const Reviews = mongoose.model('Reviews', reviewsSchema)