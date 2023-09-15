import axios from 'axios'
import { useEffect, useContext } from 'react'
import { UserContext } from '../App'
import { getToken } from '../utility/auth'
import { useNavigate } from 'react-router'

export default function Profile() {
  const { user, setUser } = useContext(UserContext)
  const token = getToken()
  const redirect = useNavigate()

  useEffect(() => {
    async function getUserProfile() {
      try {
        if (user) {
          const { data } = await axios.get('/api/profile', {
            headers: {
              'Authorization': token,
            },
          })
          console.log(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getUserProfile()
  }, [])
  return <h1>Profile</h1>
}