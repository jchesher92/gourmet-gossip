import axios from 'axios'
import { useEffect, useContext, useState } from 'react'
import { UserContext } from '../App'
import { getToken } from '../utility/auth'
import { useNavigate } from 'react-router'
import Spinner from './Spinner'

export default function Profile() {
  const { user, setUser } = useContext(UserContext)
  const [profile, setProfile] = useState({})
  const token = getToken()
  const redirect = useNavigate()

  useEffect(() => {
    async function getUserProfile() {
      try {
        if (token) {
          const { data } = await axios.get('/api/profile', {
            headers: {
              'Authorization': token,
            },
          })
          setProfile(data)
          console.log(data)
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
    <>
      <section className='container profile-container'>
        {profile ?
          <>
            <h1>Profile</h1>
            <div className='profile-info'>
              <h1>Profile Name: {profile.username}</h1>
              <h1>Email: {profile.email}</h1>
              <h1>Recipes added: {profile.recipesAdded}</h1>
              <h1>Favorites: {profile.favourites}</h1>
            </div>
          </>
          :
          <Spinner />
        }
      </section>
    </>
  )
}