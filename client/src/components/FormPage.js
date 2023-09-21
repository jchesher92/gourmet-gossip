import { useState, useContext } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { formValues, stateValues } from '../utility/common.js'
import Col from 'react-bootstrap/esm/Col.js'
import Row from 'react-bootstrap/esm/Row.js'
import { Link } from 'react-router-dom'

import { setToken } from '../utility/auth.js'
import { useNavigate } from 'react-router'
import { UserContext } from '../App.js'

export default function FormPage({ title, formStructure, request }) {
  const { user, setUser } = useContext(UserContext)
  const [formData, setFormData] = useState(formValues(formStructure))
  const [errorMessage, setErrorMessage] = useState('')
  const [validated, setValidated] = useState(false)
  const navigate = useNavigate()


  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrorMessage('')
  }

  async function handleSubmit(e) {
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
      <section className="container sign-form-container">
        <Row>
          <Col md={6} sm={0} className='welcome-message'>
            {
              title === 'Your Account'
                ?
                <>
                  <h2>Welcome back!</h2>
                  <h4>Sign back in to your account to access your recipes</h4>
                </>
                :
                <>
                  <h2>We&apos;re so excited you could join us!</h2>
                  <h4>Register to start sharing your delicious recipes</h4>
                </>
            }
          </Col>
          <Col md={6} sm={12}>
            <Form noValidate validated={validated} onSubmit={handleSubmit} className='mb-4'>
              <h1>{title}</h1>
              {
                formValues(formStructure).map((field, idx) => {
                  return (
                    <Form.Group className="form-floating mb-3" key={idx} controlId={field.name}>
                      <Form.Control id='sign-form-control' type={field.type} name={field.variable} placeholder={field.name} onChange={handleChange} required></Form.Control>
                      <Form.Label>{field.name}</Form.Label>
                      <Form.Control.Feedback type="invalid">
                        {field.name} is required.
                      </Form.Control.Feedback>
                    </Form.Group>
                  )
                })
              }
              <Button type='submit' className='my-5'>{title === 'Your Account' ? 'Log In' : title}</Button>
              {errorMessage && <h2>{errorMessage}</h2>}
              {title === 'Your Account' && <h6>Don&apos;t have an account?   <Link to={'/register'} >Sign Up</Link> </h6>}
            </Form>
          </Col>
        </Row>
      </section>
    </>
  )
}