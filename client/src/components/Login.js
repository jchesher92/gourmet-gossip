import FormPage from './FormPage'
import axios from 'axios'

export default function Login({ setUser }) {
  const formStructure = [
    {
      type: 'email',
      name: 'email',
    },
    {
      type: 'password',
      name: 'password',
    }
  ]

  function login(formData) {
    return axios.post('/login', formData)
  }

  return (
    <FormPage title='Login' formStructure={formStructure} request={login} setUser={setUser} />
  )
}