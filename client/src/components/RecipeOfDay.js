import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Spinner from './Spinner'

// BOOTSTRAP
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// ICON
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire, faUtensils, faStar } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'

export default function RecipeOfDay() {

  const [ todaysRecipe, setTodaysRecipe ] = useState(null)

  useEffect(() => {
    async function getRandomRecipe() {
      try {
        const { data } = await axios.get('/api/recipes/random')
        setTodaysRecipe(data[0])
      } catch (error) {
        console.log(error)
      }
    }
    getRandomRecipe()
  }, [])

  return (
    <Container fluid className='container-random-recipe'>
      <Row>
        <Col><h4>Recipe of the day</h4></Col>
      </Row>
      { todaysRecipe ?
        <Container className='container-random-recipe-inside'>
          <Row>
            <Col md='6' className='colum-left'>
              <img src={todaysRecipe.image} className='image-recipe' />
            </Col>
            <Col md='6' className='colum-right'>
              <p className='diet-button-recipe-of-day'>{todaysRecipe.diet}</p>
              <p className='category mt-4'>{todaysRecipe.category}</p>
              <h1>{todaysRecipe.title}</h1>
              <p>{todaysRecipe.description}</p>
              <h2 className='mt-4'>Ingredients</h2>
              <ul>
                {todaysRecipe.ingredients.map((ingredient, index) => {
                  return <li key={index}>{ingredient.amount} {ingredient.name}</li>
                })}
              </ul>
              <h3>Method</h3>
              <p>{todaysRecipe.method}</p>
              <FontAwesomeIcon icon={faFire} style={{ color: '#ff5f40' }} />
              <p className="p-next-icon-first">{todaysRecipe.difficulty}</p>
              <FontAwesomeIcon icon={faClock} style={{ color: '#FF5F40' }} />
              <p className="p-next-icon-first">{todaysRecipe.time} min</p>
              <FontAwesomeIcon icon={faUtensils} style={{ color: '#FF5F40' }} />
              <p className="p-next-icon-first">{todaysRecipe.serves} serves</p>
            </Col>
          </Row>
        </Container> 
        : <Spinner />
      }
    </Container>
  )
}