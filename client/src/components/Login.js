import FormPage from './FormPage'
import axios from 'axios'

export default function Login() {
  const formStructure = [
    {
      type: 'email',
      name: 'Email',
    },
    {
      type: 'password',
      name: 'Password',
    }
  ]

  function login(formData) {
    return axios.post('/api/login', formData)
  }

  return (
    <FormPage title='Your Account' formStructure={formStructure} request={login} />
  )
}