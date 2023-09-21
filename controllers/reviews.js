import mongoose from 'mongoose'
import Recipe from '../models/recipe.js'

// * Create Review Route
// Endpoint: POST /recipes/:id/reviews
export const createReview = async (req, res) => {

  // Take id from params
  const { id } = req.params

  // Check id is valid
  if (!mongoose.isValidObjectId(id)) {
    return res.status(422).json({ error: 'Invalid ObjectID' })
  }

  try {
    // Look for recipe using the id from the params
    const recipe = await Recipe.findById(id)

    // If recipe not found, then throw an error
    if (!recipe) {
      throw new Error('Recipe not found')
    }

    recipe.reviews.push({ ...req.body, addedBy: req.user._id })

    // Save
    await recipe.save()

    // Send the updated document back
    return res.status(201).json(recipe)
  } catch (error) {
    console.log(error)
    return res.status(404).json({ error: error.message })
  }
}

// * Delete Review Route
// Endpoint: DELETE /recipes/:recipeId/reviews/:reviewId
export const deleteReview = async (req, res) => {

  // Take id from params
  const { recipeId, reviewId } = req.params

  // Check id is valid
  if (!mongoose.isValidObjectId(recipeId) || !mongoose.isValidObjectId(reviewId)) {
    return res.status(422).json({ error: 'Invalid ObjectID' })
  }

  try {
    const recipe = await Recipe.findById(recipeId)

    if (!recipe) throw new Error('Recipe not found')

    // Find the review within recipe.reviews
    const reviewToDelete = recipe.reviews.id(reviewId)

    // If no review found, throw 404
    if (!reviewToDelete) throw new Error('Review not found')

    // Check user added recipe
    if (!reviewToDelete.addedBy.equals(req.user._id)) return res.status(401).json({ error: 'Unauthorized' })

    // Delete the review
    reviewToDelete.deleteOne()

    // Save the recipe with the updated array where the review has been deleted
    await recipe.save()

    return res.sendStatus(204)
  } catch (error) {
    console.log(error)
    return res.status(404).json({ error: error.message })
  }
}