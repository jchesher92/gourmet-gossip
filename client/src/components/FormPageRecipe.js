import { useState, useContext, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
// import Select from 'react-select'
import { setToken } from '../utility/auth.js'
import { useNavigate } from 'react-router'
import { UserContext } from '../App.js'
import ImageUpload from './ImageUpload.js'
import { Fragment } from 'react'
import { stateValues, formValues } from '../utility/common.js'

// FORM
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'

// BOOTSTRAP
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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
    !user && navigate('/login')
  })

  useEffect(() => {
    setFormData({ ...formData, ingredients: inputIngredients })
  }, [inputIngredients])

  useEffect(() => {
    async function fillFormFields() {
      try {
        const { data } = await onLoad()
        setFormData(data)
        setInputIngredients(data.ingredients)
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
    setFormData({ ...formData, [event.target.name]: event.target.value })
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
      if (redirect) {
        navigate(redirect)
      }
    } catch (error) {
      console.log('error:', error)
      setErrorMessage(error.response.data.error)
    }
  }

  function deleteIngredient(e) {
    const newInputIngredients = [...inputIngredients]
    newInputIngredients.splice(e.target.value, 1)
    setInputIngredients(newInputIngredients)
  }

  return (
    <>
      <div className=" container recipe-form-container">
        <h1>{title}</h1>
        <Form noValidate validated={validated} onSubmit={handleSubmit} className='mt-4'>
          <Container fluid>
            <Row>
              <Col xs={12} md={6} id='left-column'>
                {/* Title */}
                <FloatingLabel label='Title' className='mb-3'>
                  <Form.Control type='text' value={formData.title} placeholder='Title' required id='title' name='title' onChange={handleChange} />
                  <Form.Control.Feedback type="invalid">Title is required.</Form.Control.Feedback>
                </FloatingLabel>
                {/* Category */}
                <FloatingLabel label='Category' className='mb-3'>
                  <Form.Control as='select' value={formData.category} placeholder='Category' required aria-label="Floating label select example" id='category' name='category' onChange={handleChange} >
                    <option value=''>- Category -</option>
                    <option value='Breakfast'>Breakfast</option>
                    <option value='Lunch'>Lunch</option>
                    <option value='Dinner'>Dinner</option>
                    <option value='Dessert'>Dessert</option>
                    <option value='Snack'>Snack</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">Category is required.</Form.Control.Feedback>
                </FloatingLabel>
                {/* Diet */}
                <FloatingLabel label='Diet' className='mb-3'>
                  <Form.Control as='select' value={formData.diet} placeholder='Diet' required aria-label="Floating label select example" className='form-control' id='diet' name='diet' onChange={handleChange}>
                    <option value=''>- Diet -</option>
                    <option value='Meat'>Meat</option>
                    <option value='Fish'>Fish</option>
                    <option value='Vegetarian'>Vegetarian</option>
                    <option value='Vegan'>Vegan</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">Diet is required.</Form.Control.Feedback>
                </FloatingLabel>
                {/* Description */}
                <FloatingLabel label='Description' className='mb-3'>
                  <Form.Control as='textarea' rows='2' value={formData.description} placeholder='Description' required className='form-control textarea' id='description' name='description' onChange={handleChange} />
                  <Form.Control.Feedback type="invalid">Description is required.</Form.Control.Feedback>
                </FloatingLabel>
                {/* Image */}
                <ImageUpload required formData={formData} setFormData={setFormData} />

              </Col>
              <Col xs={12} md={6}>
                {/* Difficulty */}
                <FloatingLabel label='Difficulty' className='mb-3'>
                  <Form.Control as='select' value={formData.difficulty} placeholder='Difficulty' required aria-label="Floating label select example" id='difficulty' name='difficulty' onChange={handleChange}>
                    <option value=''>- Difficulty -</option>
                    <option value='Easy'>Easy</option>
                    <option value='Intermediate'>Intermediate</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">Difficulty is required.</Form.Control.Feedback>
                </FloatingLabel>
                {/* Time */}
                <FloatingLabel label='Time in minutes' className='mb-3'>
                  <Form.Control type='number' value={formData.time} placeholder='Time' required id='time' name='time' onChange={handleChange} />
                  <Form.Control.Feedback type="invalid">Time is required.</Form.Control.Feedback>
                </FloatingLabel>
                {/* Serves */}
                <FloatingLabel label='Serves' className='mb-3'>
                  <Form.Control type='number' value={formData.serves} placeholder='Serves' required id='serves' name='serves' onChange={handleChange} />
                  <Form.Control.Feedback type="invalid">Servse is required.</Form.Control.Feedback>
                </FloatingLabel>
                {/* Method */}
                <FloatingLabel label='Method' className='mb-3'>
                  <Form.Control as='textarea' value={formData.method} placeholder='Method' required className='textarea' id='method' name='method' onChange={handleChange} />
                  <Form.Control.Feedback type="invalid">Method is required.</Form.Control.Feedback>
                </FloatingLabel>
                {/* Ingredients */}
                <Button className='mb-4 green-button' onClick={addFields}>Click to add ingredients</Button>
                {inputIngredients.map((ingredientObject, index) => {
                  return (
                    <Row key={index} className='mb-3'>
                      <Col sm={6} xs={12}>
                        <FloatingLabel label='Name'>
                          <Form.Control value={ingredientObject.name} data-type='name' required type='text' id='name-ingredient' name='name' placeholder='Name' onChange={(e) => handleUpdateIngredients(e, ingredientObject)} />
                          <Form.Control.Feedback type='invalid'>Name is required.</Form.Control.Feedback>
                        </FloatingLabel>
                      </Col>
                      <Col sm={5} xs={10}>
                        <FloatingLabel label='Amount'>
                          <Form.Control required value={ingredientObject.amount} data-type='amount' type='text' id='amount-ingredient' name='amount' placeholder='Amount' onChange={(e) => handleUpdateIngredients(e, ingredientObject)} />
                          <Form.Control.Feedback type='invalid'>Amount is required.</Form.Control.Feedback>
                        </FloatingLabel>
                      </Col>
                      <Col sm={1} xs={2} className='d-flex col-delete pt-2'>
                        <Button value={index} onClick={deleteIngredient} className='red-button-delete'>x</Button>
                      </Col>
                    </Row>
                  )
                })}
              </Col>
            </Row>
            <Row>
              <Col className='submit-button'>
                {/* Submit */}
                <Button className='mt-4' type="submit">{title}</Button>
              </Col>
            </Row>
          </Container>




        </Form>
      </div>
    </>
  )
}