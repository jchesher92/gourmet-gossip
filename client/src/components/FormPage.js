import { useState, useContext } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { formValues, stateValues } from '../utility/common.js'

import { setToken } from '../utility/auth.js'
import { useNavigate } from 'react-router'
import { UserContext } from '../App.js'

export default function FormPage({ title, formStructure, request }) {
  const { user, setUser } = useContext(UserContext)
  const [formData, setFormData] = useState(stateValues(formStructure))
  const [errorMessage, setErrorMessage] = useState('')
  const [validated, setValidated] = useState(false)
  const navigate = useNavigate()


  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrorMessage('')
  }

  async function handleSubmit(e) {
    console.log(e)
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    setValidated(true)
    e.preventDefault()
    try {
      const { data } = await request(formData)
      if (data.token) {
        setToken(data.token)
        setUser(true)
      }
      navigate('/profile')
    } catch (error) {
      console.log(error)
      setErrorMessage(error.response.data.error)
    }
  }

  return (
    <>
      <section className="container form-container">
        <h1>{title}</h1>
        <Form noValidate validated={validated} onSubmit={handleSubmit} className='mb-4'>
          {
            formValues(formStructure).map((field, idx) => {
              return (
                <Form.Group className="form-floating mb-3" key={idx} controlId={field.name}>
                  <Form.Control type={field.type} name={field.name} placeholder={field.name} onChange={handleChange} required></Form.Control>
                  <Form.Label>{field.name}</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {field.name} is required.
                  </Form.Control.Feedback>
                </Form.Group>
              )
            })
          }
          {errorMessage && <h2>{errorMessage}</h2>}
          <Button type='submit'>{title}</Button>
        </Form>
      </section>
    </>
  )
}