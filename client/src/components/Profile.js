import axios from 'axios'
import { useEffect, useContext, useState } from 'react'
import { UserContext } from '../App'
import { getToken } from '../utility/auth'
import { useNavigate } from 'react-router'
import Spinner from './Spinner'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import profileImg from '../images/profile-default.png'
import RecipeCard from './RecipeCard'

export default function Profile() {
  const { user, setUser } = useContext(UserContext)
  const [profile, setProfile] = useState({})
  const [userRecipes, setUserRecipes] = useState([])
  const token = getToken()
  const redirect = useNavigate()

  useEffect(() => {
    async function getUserProfile() {
      try {
        if (token) {
          const { data: profile } = await axios.get('/api/profile', {
            headers: {
              'Authorization': token,
            },
          })
          const { data: recipes } = await axios.get('/api/recipes')
          const userRecipes = recipes.filter(recipe => recipe.addedBy === profile._id)
          setUserRecipes(userRecipes)
          setProfile(profile)
          console.log(userRecipes)
        } else {
          redirect('/login')
        }
      } catch (error) {
        console.log(error)
      }
    }
    getUserProfile()
  }, [])

  return (
    <Container className='profile-container'>
      {profile ?
        <>
          <Row className='profile-details'>
            <div className='profile-info'>
              <img src={profileImg}></img>
              <h1>{profile.username}</h1>
              <h1>{profile.email}</h1>
            </div>
          </Row>
          <Row>
            {userRecipes.length > 0 &&
              userRecipes.map(recipe => {
                return <RecipeCard key={recipe._id} recipe={recipe} />
              })
            }
          </Row>
        </>
        :
        <Spinner />
      }
    </Container>
  )
}