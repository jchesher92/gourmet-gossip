import { useState, useContext, useEffect } from 'react'
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

export default function FormPageRecipe({ title, formStructure, setFormStructure, request, redirect, onLoad }) {

  const [inputIngredients, setInputIngredients] = useState([])
  const { user, setUser } = useContext(UserContext)
  const [formData, setFormData] = useState(stateValues(formStructure))
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const [validated, setValidated] = useState(false)

  function addFields(e) {
    e.preventDefault()
    setInputIngredients([...inputIngredients, { name: '', amount: '' }])
  }

  useEffect(() => {
    setFormData({ ...formData, ingredients: inputIngredients })
  }, [inputIngredients])

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

  useEffect(() => {
    async function fillFormFields() {
      try {
        const { data } = await onLoad()
        console.log('data', data)
        console.log('title', data.title)
        setFormData(data)
        setInputIngredients(data.ingredients)
        console.log('formdata', formData)
      } catch (error) {
        console.log(error)
        setErrorMessage(error)
      }
    }
    if (onLoad) {
      fillFormFields()
    }
  }, [onLoad])

  const handleUpdateIngredients = (e, objectToUpdate) => {
    const { dataset: { type }, value } = e.target

    const newIngredientsList = inputIngredients.map(i => {
      if (i !== objectToUpdate) return i
      return { ...i, [type]: value }
    })
    setInputIngredients(newIngredientsList)
  }

  function handleChange(event) {
    // console.log('input changed but not ingredients:', event)
    setFormData({ ...formData, [event.target.name]: event.target.value })
    setErrorMessage('')
  }

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
              const newValue = field.variable
              console.log(newValue)
              return (
                <FloatingLabel
                  key={idx}
                  label={field.name}
                  className="mb-3"
                  id={idx}
                >
                  {/* SELECT */}
                  {field.type === 'select' &&
                    <>
                      <Form.Control value={formData[newValue]} as='select' required aria-label="Floating label select example" name={field.variable} className="form-control" id={field.variable} placeholder={field.name} onChange={handleChange}>
                        <option value="">- {field.name} -</option>
                        {field.options.map((option, index) => {
                          return <option value={option} key={index}>{option}</option>
                        })}
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">{field.name} is required.</Form.Control.Feedback>
                    </>
                  }
                  {/* INGREDIENTS */}
                  {field.type === 'text-list' &&
                    <>
                      {inputIngredients.map((ingredientObject, index) => {
                        return (
                          <Fragment key={index}>
                            <Form.Control value={ingredientObject.name} data-type="name" required type='text' className="form-control" id='name-ingredient' name='name' placeholder='Name' onChange={(e) => handleUpdateIngredients(e, ingredientObject)} />
                            <Form.Control.Feedback type="invalid">Name of ingredient is required.</Form.Control.Feedback>
                            <Form.Control required value={ingredientObject.amount} data-type="amount" type='text' className="form-control" id='amount-ingredient' name='amount' placeholder='Amount' onChange={(e) => handleUpdateIngredients(e, ingredientObject)} />
                            <Form.Control.Feedback type="invalid">Amount of ingredient is required.</Form.Control.Feedback>
                          </Fragment>
                        )
                      })}
                      <button onClick={addFields}>Add ingredient</button>
                    </>
                  }
                  {/* IMAGE */}
                  {field.type === 'file' &&
                    <>
                      <ImageUpload required formData={formData} setFormData={setFormData} />
                    </>
                  }
                  {/* TEXT -NUMBER */}
                  {(field.type === 'text' || field.type === 'number') &&
                    <>
                      <Form.Control value={formData[newValue]} required placeholder={field.name} type={field.type} className="form-control" id={field.variable} name={field.variable} onChange={handleChange} />
                      <Form.Control.Feedback type="invalid">{field.name} is required.</Form.Control.Feedback>
                    </>
                  }
                  {/* TEXTAREA */}
                  {field.type === 'textarea' &&
                    <>
                      <Form.Control value={formData[newValue]} required placeholder={field.name} as='textarea' className="form-control" id={field.variable} name={field.variable} onChange={handleChange} />
                      <Form.Control.Feedback type="invalid">{field.name} is required.</Form.Control.Feedback>
                    </>
                  }
                </FloatingLabel>
              )
            })
          }
          {/* {errorMessage && <h2>{errorMessage}</h2>} */}
          <Button type="submit">{title}</Button>
        </Form>
      </section>
    </>
  )
}