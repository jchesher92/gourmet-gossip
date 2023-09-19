import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

// COMPONENTS
import Spinner from './Spinner'

// BOOTSTRAP
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'

// ICON
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire, faUtensils } from '@fortawesome/free-solid-svg-icons'
import { faClock, faStar } from '@fortawesome/free-regular-svg-icons'

export default function SingleRecipe() {

  const [recipe, setRecipe] = useState()
  const { id } = useParams()

  useEffect(() => {
    const getRecipeData = async () => {
      try {
        const { data } = await axios.get(`/api/recipes/${id}`)
        setRecipe(data)
      } catch (error) {
        console.log(error)
      }
    }
    getRecipeData()
  }, [])


  return (
    <>
      {recipe ?
        <Container className='single-recipe-container'>
          <Row>
            <Col md='6' sm='12'>
              <>
                <img src={recipe.image}></img>
                <div className='mt-3'>
                  <FontAwesomeIcon icon={faFire} style={{ color: '#ff5f40' }} />
                  <p className="p-next-icon-first">{recipe.difficulty}</p>
                  <FontAwesomeIcon icon={faClock} style={{ color: '#FF5F40' }} />
                  <p className="p-next-icon-first">{recipe.time} min</p>
                  <FontAwesomeIcon icon={faUtensils} style={{ color: '#FF5F40' }} />
                  <p className="p-next-icon-first">{recipe.serves} serves</p>
                </div>
              </>
            </Col>
            <Col md='6' sm='12'>
              <p className='diet-button'>{recipe.diet}</p>
              <p className='category mt-4'>{recipe.category}</p>
              <h1>{recipe.title}</h1>
              <p>{recipe.description}</p>
              <h2 className='mt-4'>Ingredients</h2>
              <ul>
                {recipe.ingredients.map((ingredient, index) => {
                  return <li key={index}>{ingredient.amount} {ingredient.name}</li>
                })}
              </ul>
            </Col>
          </Row>
          <Row className='mt-5 mb-3'>
            <h3>Method</h3>
            <p>{recipe.method}</p>
          </Row>
          {recipe.reviews.map((review, index) => {
            return (
              <Row key={index} className='reviews'>
                <Col md='10'>
                  <h4>{review.comment}</h4>
                </Col>
                <Col className='admin-information' md='2'>
                  <div>
                    {Array(review.rating).fill(true).map((_, i) => <FontAwesomeIcon icon={faStar} size="xs" style={{ color: '#fff' }} key={i} />)}
                  </div>
                  <p>by {recipe.addedBy.username}</p>
                </Col>
              </Row>
            )
          })}
          <Row className='mt-4'>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className='fw-bold'>Write a review</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Row className='submit-review-container'>
              <Col md='3'>
                <FloatingLabel
                  controlId="floatingSelectGrid"
                  label="Rating"
                >
                  <Form.Select aria-label="Rating">
                    <option disabled>Select a rating</option>
                    <option value="1">One Star</option>
                    <option value="2">Two Stars</option>
                    <option value="3">Three Stars</option>
                    <option value="4">Four Stars</option>
                    <option value="5">Five Stars</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col md='3'>
                <Form.Group>
                  <Button className='submit-review'>Submit</Button>
                </Form.Group>
              </Col>
            </Row>
          </Row>
        </Container>
        :
        <Spinner />
      }
    </>

  )
}