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
import { faFire } from '@fortawesome/free-solid-svg-icons'
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
        <Container>
          <Row>
            <Col>
              <Row>
                <img src={recipe.image}></img>
              </Row>
              <Row>
                <h3>{recipe.difficulty}</h3>
                <h3>{recipe.time} min</h3>
              </Row>
            </Col>
            <Col>
              <Button className=''>{recipe.diet}</Button>
              <h1>{recipe.title}</h1>
              <p>{recipe.description}</p>
              <h2>Ingredients</h2>
              <ul>
                {recipe.ingredients.map((ingredient, index) => {
                  return <li key={index}>{ingredient.amount} {ingredient.name}</li>
                })}
              </ul>
            </Col>
          </Row>
          <Row>
            <h2>Method</h2>
            <p>{recipe.method}</p>
          </Row>
          {recipe.reviews.map((review, index) => {
            return (
              <Row key={index}>
                <Container>
                  <Row>
                    <Col>
                      <h3>{review.comment}</h3>
                    </Col>
                    <Col>
                      <div>
                        {Array(review.rating).fill(true).map((_, i) => <FontAwesomeIcon icon={faStar} size="xs" style={{ color: '#212529' }} key={i} />)}
                      </div>
                      <h3>{recipe.addedBy.username}</h3>
                    </Col>
                  </Row>
                </Container>
              </Row>
            )
          })}
          <Row>
            <Row>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Review</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Row>
            <Row>
              <Col>
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
              <Col>
                <Form.Group>
                  <Button>Submit</Button>
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