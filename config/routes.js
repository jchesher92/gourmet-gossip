import express from 'express'
import { getAllRecipes, getSingleRecipe, createRecipe, updateRecipe, deleteRecipe, likeRecipe, randomRecipe } from '../controllers/recipes.js'
import { registerUser, loginUser, getUserProfile } from '../controllers/users.js'
import { createReview, deleteReview } from '../controllers/reviews.js'
import { secureRoute } from './secureRoute.js'

const router = express.Router()

// ! Recipes
// Index route
router.route('/recipes')
  .get(getAllRecipes)
  .post(secureRoute, createRecipe)

// Random route
router.route('/recipes/random')
  .get(randomRecipe)

// // Top Rated route
// router.route('/recipes/toprated')
//   .get(topRatedRecipes)

// Single route
router.route('/recipes/:id')
  .get(getSingleRecipe)
  .put(secureRoute, updateRecipe)
  .delete(secureRoute, deleteRecipe)

router.route('/recipes/:id/likes')
  .put(secureRoute, likeRecipe)

// ! Reviews
// Index route
router.route('/recipes/:id/reviews')
  .post(secureRoute, createReview)

// Single route
router.route('/recipes/:recipeId/reviews/:reviewId')
  .delete(secureRoute, deleteReview)



// ! Users
// Register route
router.route('/register')
  .post(registerUser)

// Login route 
router.route('/login')
  .post(loginUser)

// Profile route
router.route('/profile')
  .get(secureRoute, getUserProfile)


export default router