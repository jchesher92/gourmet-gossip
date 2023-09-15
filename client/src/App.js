import { useEffect, useState } from 'react'
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

  const [user, setUser] = useState(false)
  console.log('user is:', user)
  // useEffect(() => {
  //   async function getData(){
  //     try {
  //       await axios.get('/api/products') // <---- Replace with your endpoint to test the proxy
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   getData()
  // }, [])

  return (
    <BrowserRouter>
      <Header user={user} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recipes' element={<AllRecipes />} />
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
    </BrowserRouter>
  )
}
