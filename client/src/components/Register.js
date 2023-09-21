import FormPage from './FormPage'
import axios from 'axios'

export default function Register({ setUser }) {
  // * Set the structure for the register form
  const formStructure = [
    {
      type: 'text',
      name: 'Username',
    },
    {
      type: 'email',
      name: 'Email',
    },
    {
      type: 'password',
      name: 'Password',
    },
    {
      type: 'password',
      name: 'Password Confirmation',
    }
  ]
  // * Set the request type for axios
  function register(formData) {
    return axios.post('/api/register', formData)
  }
  return (
    <FormPage title='Register' formStructure={formStructure} request={register} setUser={setUser} />
  )
}