// ! Imports
import mongoose from 'mongoose'

// ! Review Schema
const reviewSchema = new mongoose.Schema({
  rating: { type: Number },
  addedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  comment: { type: String }
})

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
  ingredients: [{}],
  image: { type: String, required: true },
  addedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  reviews: [
    reviewSchema
  ]
})

export default mongoose.model('Recipe', recipeSchema)