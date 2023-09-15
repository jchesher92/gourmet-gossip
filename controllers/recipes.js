import mongoose from 'mongoose'
import Recipe from '../models/recipe.js'

// ! Index route
// Endpoint: GET /recipes
export const getAllRecipes = async (req, res) => {
  // Extract data from the database via the model
  const recipes = await Recipe.find()
  return res.json(recipes)
}


// ! Show route
// Endpoint: GET /recipes/:id
export const getSingleRecipe = async (req, res) => {
  const { id } = req.params

  if (!mongoose.isValidObjectId(id)) {
    return res.status(422).json({ error: 'Invalid ObjectID' })
  }

  try {
    const recipe = await Recipe.findById(id).populate('addedBy').populate('reviews.addedBy')

    if (!recipe) {
      throw new Error('Recipe not found')
    }

    return res.json(recipe)
  } catch (error) {
    console.log('ERROR ->', error)
    return res.status(404).json({ message: error.message })
  }
}


// ! Create route
// Endpoint: POST /recipes
export const createRecipe = async (req, res) => {
  try {
    const recipeCreated = await Recipe.create({ ...req.body, addedBy: req.user._id })
    return res.status(201).json(recipeCreated)
  } catch (error) {
    console.log(error.code)
    if (error.code === 11000) {
      return res.status(422).json({
        error: {
          name: 'Duplicate key',
          field: error.keyValue,
        },
      })
    }
    return res.status(422).json(error)
  }
}


// ! Update route
// Endpoint: PUT /recipes/:id
export const updateRecipe = async (req, res) => {
  const { id } = req.params

  if (!mongoose.isValidObjectId(id)) {
    return res.status(422).json({ error: 'Invalid ObjectID' })
  }

  try {
    const updatedRecipe = await Recipe.findById(id)

    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' })
    }

    Object.assign(updatedRecipe, req.body)
    await updatedRecipe.save()

    return res.json(updatedRecipe)
  } catch (error) {
    console.log(error)
    return res.status(422).json(error)
  }

}

// ! Delete route
// Endpoint: DELETE /recipes/:id
export const deleteRecipe = async (req, res) => {
  const { id } = req.params

  // Check id is valid, return 422 if not
  if (!mongoose.isValidObjectId(id)) {
    return res.status(422).json({ error: 'Invalid ObjectID' })
  }
  try {
    const foundRecipe = await Recipe.findById(id)

    if (!foundRecipe.addedBy.equals(req.user._id)) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const recipeDeleted = await Recipe.findByIdAndDelete(id)

    if (!recipeDeleted) throw new Error('Recipe not found')

    return res.sendStatus(204)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ error: err.message })
  }
}

// Endpoint: /recipes/:id/like
export const likeRecipe = async (req, res) => {
  const { id } = req.params
  const recipe = await Recipe.findById(id)

  if (!recipe.likes.includes(req.user._id)) {
    recipe.likes.push(req.user._id)
    await recipe.save()
  }
  return res.json(recipe)
}
