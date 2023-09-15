import { useState, useContext } from 'react'
import Button from 'react-bootstrap/Button'
import { setToken } from '../utility/auth.js'
import { useNavigate } from 'react-router'
import { UserContext } from '../App.js'

export default function FormPage({ title, formStructure, request }) {
  const { user, setUser } = useContext(UserContext)
  const [formData, setFormData] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrorMessage('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const { data } = await request(formData)
      if (data.token) {
        setToken(data.token)
        setUser(true)
      }
      // navigate('/profile')
    } catch (error) {
      console.log(error)
      setErrorMessage(error.response.data.error)
    }
  }

  return (
    <>
      <section className="container form-container">
        <h1>{title}</h1>
        <form>
          {
            formStructure.map((field, idx) => {
              return (
                <div className="form-floating mb-3" key={idx}>
                  <input type={field.type} className="form-control" id={field.name} name={field.name} placeholder={field.name} onChange={handleChange}></input>
                  <label htmlFor={field.name} className="form-label">{field.name}</label>
                </div>
              )
            })
          }
          {errorMessage && <h2>{errorMessage}</h2>}
          <Button onClick={handleSubmit}>{title}</Button>
        </form>
      </section>
    </>
  )
}