import { useEffect, useState, createContext } from 'react'
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

export const UserContext = createContext()

export default function App() {
  const [user, setUser] = useState(false)

  // SEARCH FUNCTION

  const [recipes, setRecipes] = useState([])
  const [filteredRecipes, setFilteredRecipes] = useState([])
  const [filter, setFilter] = useState({
    search: '',
    category: 'All',
    diet: 'All',
    difficulty: 'All',
  })

  const [newSearch, setNewSearch] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [newDiet, setNewDiet] = useState('')
  const [newDifficulty, setNewDifficulty] = useState('')

  function handleChange(e) {
    const newFilterState = { ...filter, [e.target.name]: e.target.value }
    setFilter(newFilterState)
    if (e.target.name === 'search') {
      setNewSearch(e.target.value)
    } else if (e.target.name === 'category') {
      setNewCategory(e.target.value)
    } else if (e.target.name === 'diet') {
      setNewDiet(e.target.value)
    } else if (e.target.name === 'difficulty') {
      setNewDifficulty(e.target.value)
    }
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
      <UserContext.Provider value={{ user: user, setUser: setUser }}>
        <Header
          user={user}
          setUser={setUser}
        />
        <Routes>
          <Route path='/' element={<Home
            handleChange={handleChange} />} />
          <Route path='/recipes' element={<AllRecipes
            recipes={recipes}
            filteredRecipes={filteredRecipes}
            newSearch={newSearch}
            newCategory={newCategory}
            newDiet={newDiet}
            newDifficulty={newDifficulty}
            handleChange={handleChange} />} />
          <Route path='/recipes/:recipeId' element={<SingleRecipe />} />
          <Route path='/login' element={<Login setUser={setUser} />} />
          <Route path='/register' element={<Register setUser={setUser} />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/recipes/add' element={<AddRecipe />} />
          <Route path='/recipes/:recipeId/update' element={<UpdateRecipe />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </UserContext.Provider>
    </BrowserRouter>
  )
}
