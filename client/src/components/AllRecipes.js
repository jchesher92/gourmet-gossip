import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import foodExample from '../images/food-example.jpg'

// COMPONENTS
import Search from './Search'
import Spinner from './Spinner'

// BOOTSTRAP
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// ICON
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faStar } from '@fortawesome/free-regular-svg-icons'
import { faFire } from '@fortawesome/free-solid-svg-icons'


export default function AllRecipes({ filter, handleChange, newSearch, newCategory, newDiet, newDifficulty, resetFilters }) {

  const [recipes, setRecipes] = useState([])
  const [filteredRecipes, setFilteredRecipes] = useState([])

  useEffect(() => {
    const getRecipeData = async () => {
      try {
        const { data } = await axios.get('/api/recipes')
        setRecipes(data)
      } catch (error) {
        console.log(error)
      }
    }
    getRecipeData()
  }, [])

  useEffect(() => {
    const regex = new RegExp(filter.search, 'i')
    const filteredArray = recipes.filter(recipe => {
      return (
        (regex.test(recipe.title) || regex.test(recipe.description)) &&
        (filter.category === recipe.category || filter.category === 'All') &&
        (filter.diet === recipe.diet || filter.diet === 'All') &&
        (filter.difficulty === recipe.difficulty || filter.difficulty === 'All')
      )
    })
    setFilteredRecipes(filteredArray)
  }, [filter, recipes])

  return (
    <>
      <Search
        handleChange={handleChange}
        newSearch={newSearch}
        newCategory={newCategory}
        newDiet={newDiet}
        newDifficulty={newDifficulty}
        resetFilters={resetFilters}
      />

      { filteredRecipes.length > 0 ?
        <Container className='recipes-container'>
          <Row gx-5="true" >
            {filteredRecipes.map(({ _id, diet, category, title, description, difficulty, time }) => {
              return (
                <Col
                  lg='3'
                  md='4'
                  sm='6'
                  key={_id}
                  className="recipes-flex"
                >
                  <img src={foodExample} />
                  <div className='recipe-colum'>
                    <span className="star-rating">
                      <FontAwesomeIcon icon={faStar} size="xs" style={{ color: '#212529' }} />
                      <FontAwesomeIcon icon={faStar} size="xs" style={{ color: '#212529' }} />
                      <FontAwesomeIcon icon={faStar} size="xs" style={{ color: '#212529' }} />
                      <FontAwesomeIcon icon={faStar} size="xs" style={{ color: '#212529' }} />
                      <FontAwesomeIcon icon={faStar} size="xs" style={{ color: '#212529' }} />
                    </span>
                    <p className="diet-button">{diet}</p>
                    <p className="category">{category}</p>
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <FontAwesomeIcon icon={faFire} style={{ color: '#ff5f40' }} />
                    <p className="p-next-icon-first">{difficulty}</p>
                    <FontAwesomeIcon icon={faClock} style={{ color: '#FF5F40' }} />
                    <p className="p-next-icon-second">{time} min</p>
                    <Link to={_id} className="red-button">SEE RECIPE</Link>
                  </div>
                </Col>
              )
            })}
          </Row>
        </Container>
        :
        <Container>
          <Row>
            <Col><p>Unfortunately no recipe matched your search!</p></Col>
          </Row>
        </Container>
      }
    </>
  )
}