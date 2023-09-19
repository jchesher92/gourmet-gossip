import Col from 'react-bootstrap/Col'
import RecipeCard from './RecipeCard'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { sortByAvgRating } from '../utility/common'

export default function TopRated() {
  const [topRated, setTopRated] = useState([])
  useEffect(() => {
    async function getTopRatedRecipes() {
      try {
        const { data: recipes } = await axios.get('/api/recipes')
        // const sortedTopRating = sortByAvgRating(recipes)
        console.log(recipes)
      } catch (error) {
        console.log(error)
      }
    }
    getTopRatedRecipes()
  }, [])

  return (
    <>
      <Col>
        <h1>recipe 1</h1>
      </Col>
      <Col>
        <h1>recipe 2</h1>
      </Col>
      <Col>
        <h1>recipe 3</h1>
      </Col>
    </>
  )
}