// ! Imports
import mongoose from 'mongoose'

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
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  reviews: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Review',
    required: true
  }]
})


export default mongoose.model('Recipe', recipeSchema)