// ! Imports
import mongoose from "mongoose"

// ! Review Schema
const reviewsSchema = new mongoose.Schema({
  rating: { type: Number },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  comment: { type: String }
})

export default mongoose.model('Review', reviewsSchema)