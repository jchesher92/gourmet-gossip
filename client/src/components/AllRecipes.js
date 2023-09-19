import { useEffect, useState } from 'react'
import axios from 'axios'

import HeaderPicture from './HeaderPicture'

// COMPONENTS
import Search from './Search'
import Spinner from './Spinner'

// BOOTSTRAP
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import RecipeCard from './RecipeCard'

// ICON

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
    console.log('recipes', recipes) // This is empty because setRecipes is a promise
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
      <HeaderPicture />
      <Search
        handleChange={handleChange}
        newSearch={newSearch}
        newCategory={newCategory}
        newDiet={newDiet}
        newDifficulty={newDifficulty}
        resetFilters={resetFilters}
      />

      {filteredRecipes.length > 0 ?
        <Container className='recipes-container'>
          <Row gx-5="true" >
            {filteredRecipes.map(recipe => {
              return (
                <RecipeCard recipe={recipe} key={recipe._id} />
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