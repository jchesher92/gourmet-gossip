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
import { getToken } from './utility/auth'

export const UserContext = createContext(() => {
  const token = getToken()
  if (token) {
    return true
  }
  return false
})

export default function App() {
  const [user, setUser] = useState(() => {
    const token = getToken()
    if (token) {
      return true
    }
    return false
  })

  // SEARCH FUNCTION

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

  function resetFilters() {
    setNewSearch('')
    setNewCategory('')
    setNewDiet('')
    setNewDifficulty('')
    setFilter({
      search: '',
      category: 'All',
      diet: 'All',
      difficulty: 'All',
    })
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user: user, setUser: setUser }}>
        <Header resetFilters={resetFilters} />
        <section className='main-content'>
          <Routes>
            <Route path='/' element={<Home
              handleChange={handleChange} />} />
            <Route path='/recipes' element={<AllRecipes
              filter={filter}
              newSearch={newSearch}
              newCategory={newCategory}
              newDiet={newDiet}
              newDifficulty={newDifficulty}
              resetFilters={resetFilters}
              handleChange={handleChange} />} />
            <Route path='/recipes/:id' element={<SingleRecipe />} />
            <Route path='/login' element={<Login setUser={setUser} />} />
            <Route path='/register' element={<Register setUser={setUser} />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/recipes/add' element={<AddRecipe />} />
            <Route path='/recipes/:id/update' element={<UpdateRecipe />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
        </section>
      </UserContext.Provider>
    </BrowserRouter>
  )
}
