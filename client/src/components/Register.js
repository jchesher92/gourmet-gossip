import FormPage from './FormPage'
import axios from 'axios'

export default function Register({ setUser }) {
  // * Set the structure for the register form
  const formStructure = [
    {
      type: 'text',
      name: 'username',
    },
    {
      type: 'email',
      name: 'email',
    },
    {
      type: 'password',
      name: 'password',
    },
    {
      type: 'password',
      name: 'passwordConfirmation',
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