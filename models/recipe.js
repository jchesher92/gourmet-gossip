// ! Imports
import mongoose from 'mongoose'
import random from 'mongoose-random'

// ! Review Schema
const reviewSchema = new mongoose.Schema({
  rating: { type: Number },
  addedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  comment: { type: String },
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
    required: true,
  },
  reviews: [
    reviewSchema
  ],
})

// Average rating field using virtual field
recipeSchema
  .virtual('avgRating')
  .get(function () {
    // Return a string of No ratings if the reviews array is empty
    if (!this.reviews.length > 0) return 'No ratings'
    // Return the average of the review ratings
    const ratingsSum = this.reviews.reduce((total, review) => {
      return total + review.rating
    }, 0)
    return (ratingsSum / this.reviews.length).toFixed(1)
  })

recipeSchema.set('toJSON', {
  // Adding this line means any virtuals created using get method will be included in the JSON response
  virtuals: true
})

recipeSchema.set('toObject', {
  virtuals: true
})

export default mongoose.model('Recipe', recipeSchema)