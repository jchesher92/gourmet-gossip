import { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// GLOBAL COMPONENTS
import Header from './components/Header'
import Footer from './components/Footer'

// PAGE COMPONENTS
import Home from './components/Home'
import AllRecipes from './components/AllRecipes'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import Favorites from './components/Favorites'
import AddRecipe from './components/AddRecipe'
import SingleRecipe from './components/SingleRecipe'
import UpdateRecipe from './components/UpdateRecipe'
import NotFound from './components/NotFound'


export default function App() {

  const [ user, setUser ] = useState(true)

  // SEARCH FUNCTION

  const [ recipes, setRecipes ] = useState([])
  const [ filteredRecipes, setFilteredRecipes ] = useState([])
  const [ filter, setFilter ] = useState({
    search: '',
    category: 'All',
    diet: 'All',
    difficulty: 'All',
  })

  function handleChange(e) {
    const newFilterState = { ...filter, [e.target.name]: e.target.value }
    setFilter(newFilterState)
  }

  function handleSubmit(e) {
    e.preventDefault()
  }

  useEffect(() => {
    const getRecipeData = async () => {
      try {
        const { data } = await axios.get('/api/recipes')
        setRecipes(data)
      } catch (error) {
        console.log(error)
      }
    }
    getRecipeData()
  }, [])

  useEffect(() => {
    const regex = new RegExp(filter.search, 'i')
    const filteredArray = recipes.filter(recipe => {
      return (
        (regex.test(recipe.title) || regex.test(recipe.description)) &&
        (filter.category === recipe.category || filter.category === 'All') &&
        (filter.diet === recipe.diet || filter.diet === 'All') &&
        (filter.difficulty === recipe.difficulty || filter.difficulty === 'All')
      )
    })
    setFilteredRecipes(filteredArray)
  }, [filter, recipes])

  return (
    <BrowserRouter>
      <Header
        user={user}
        setUser={setUser}
      />
      <Routes>
        <Route path='/' element={<Home
          handleSubmit={handleSubmit} />} />
        <Route path='/recipes' element={<AllRecipes
          recipes={recipes}
          filteredRecipes={filteredRecipes}
          handleChange={handleChange} />} />
        <Route path='/recipes/:recipeId' element={<SingleRecipe />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/recipes/add' element={<AddRecipe />} />
        <Route path='/recipes/:recipeId/update' element={<UpdateRecipe />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
