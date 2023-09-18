import { useState, useContext } from 'react'
import Button from 'react-bootstrap/Button'
// import Select from 'react-select'
import { setToken } from '../utility/auth.js'
import { useNavigate } from 'react-router'
import { UserContext } from '../App.js'
import ImageUpload from './ImageUpload.js'
import { Fragment } from 'react'
// import { stateValues, formValues } from '../utility/common.js'

// FORM
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'

export default function FormPage({ title, formStructure, setFormStructure, request, redirect }) {

  const [ingredients, setIngredients] = useState([{}])
  const { user, setUser } = useContext(UserContext)
  const [formData, setFormData] = useState(stateValues(formStructure))
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const [validated, setValidated] = useState(false)

  // function addFields(e) {
  //   console.log('button clicked')
  //   e.preventDefault()
  //   const moreIngredients = formStructure.filter(object => {
  //     if (object.name === 'Ingredients') {
  //       return object.ingredients.push({ name: '', amount: '' })
  //       // console.log(object)
  //     }
  //   })
  //   // console.log(moreIngredients)
  //   // setFormStructure(formStructure)
  //   setFormData(stateValues(formStructure))
  //   console.log('formStructure after button', formStructure)
  // }

  function handleChangeIngredients(index, event) {
    // console.log('ingredients changed:', event)
    if (event.target.name === 'name' || event.target.name === 'amount') {
      setIngredients([{ ...ingredients[index], [event.target.name]: event.target.value }])
      setFormData({ ...formData, ingredients })
    } else {
      setFormData({ ...formData, [event.target.name]: event.target.value })
    }
    setErrorMessage('')
  }

  function handleChange(event) {
    // console.log('input changed but not ingredients:', event)
    setFormData({ ...formData, [event.target.name]: event.target.value })
    setErrorMessage('')
  }

  function stateValues(formStructure) {
    const fieldsObj = {}
    // console.log('formStructure state values', formStructure)
    formStructure.map(field => {
      // console.log('name', field.name)
      const name = field.name[0].toLowerCase() + field.name.substr(1).replace(' ', '')
      fieldsObj[name] = ''
    })
    return fieldsObj
  }

  function formValues(formStructure) {
    return formStructure.map(field => {
      let name = field.name.replace(' ', '')
      name = name[0].toLowerCase() + name.substr(1)
      return { ...field, variable: name }
    })
  }

  // function handleChange(e) {
  //   setFormData({ ...formData, [e.target.name]: e.target.value })
  //   setErrorMessage('')
  // }

  async function handleSubmit(e) {
    console.log('event', e)
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    setValidated(true)
    e.preventDefault()
    try {
      const { data } = await request(formData)
      console.log('data', data)
      if (data.token) {
        setToken(data.token)
        setUser(true)
      }
      if (redirect) {
        navigate(redirect)
      }
    } catch (error) {
      console.log('error:', error)
      setErrorMessage(error.response.data.error)
    }
  }

  return (
    <>
      <section className="container form-container">
        <h1>{title}</h1>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {
            formValues(formStructure).map((field, idx) => {
              return (
                <FloatingLabel
                  key={idx}
                  label={field.name}
                  className="mb-3"
                  id={idx}
                >
                  {/* SELECT */}
                  { field.type === 'select' &&
                  <>
                    <Form.Control as='select' required aria-label="Floating label select example" name={field.variable} className="form-control" id={field.variable} placeholder={field.name} onChange={handleChange}>
                      <option value="">- {field.name} -</option>
                      { field.options.map((option, index) => {
                        return <option value={option} key={index}>{option}</option>
                      })}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">{field.name} is required.</Form.Control.Feedback>
                  </>
                  }
                  {/* INGREDIENTS */}
                  {field.type === 'text-list' &&
                    <>
                      {field.ingredients.map((ingredient, index) => {
                        return (
                          <Fragment key={index}>
                            <Form.Control required type='text' className="form-control" id='name-ingredient' name='name' placeholder='Name' onChange={() => handleChangeIngredients(index, event)} />
                            <Form.Control.Feedback type="invalid">Name of ingredient is required.</Form.Control.Feedback>
                            <Form.Control required type='text' className="form-control" id='amount-ingredient' name='amount' placeholder='Amount' onChange={() => handleChangeIngredients(index, event)} />
                            <Form.Control.Feedback type="invalid">Amount of ingredient is required.</Form.Control.Feedback>
                          </Fragment>
                        )
                      })}
                      {/* <button onClick={addFields}>Add ingredient</button> */}
                    </>
                  }
                  {/* IMAGE */}
                  { field.type === 'file' &&
                  <>
                    <ImageUpload required formData={formData} setFormData={setFormData} />
                  </>
                  }
                  {/* TEXT -NUMBER */}
                  { (field.type === 'text' || field.type === 'number') && 
                  <>
                    <Form.Control required placeholder={field.name} type={field.type} className="form-control" id={field.variable} name={field.variable} onChange={handleChange} />
                    <Form.Control.Feedback type="invalid">{field.name} is required.</Form.Control.Feedback>
                  </>
                  }
                  {/* TEXTAREA */}
                  { field.type === 'textarea' &&
                  <>
                    <Form.Control required placeholder={field.name} as='textarea' className="form-control" id={field.variable} name={field.variable} onChange={handleChange} />
                    <Form.Control.Feedback type="invalid">{field.name} is required.</Form.Control.Feedback>
                  </>
                  }                  
                </FloatingLabel>
              )
            })
          }
          {errorMessage && <h2>{errorMessage}</h2>}
          <Button type="submit">{title}</Button>
        </Form>
      </section>
    </>
  )
}