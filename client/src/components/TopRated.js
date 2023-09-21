
import { useState, useEffect } from 'react'
import axios from 'axios'
import { sortByAvgRating } from '../utility/common'
import Spinner from './Spinner'
import Carousel from 'react-bootstrap/Carousel'
import { Link } from 'react-router-dom'

export default function TopRated() {
  const [topRated, setTopRated] = useState([])

  useEffect(() => {
    async function getTopRatedRecipes() {
      try {
        const { data: recipes } = await axios.get('/api/recipes')
        sortByAvgRating(recipes)
        setTopRated(recipes.slice(0, 3))
      } catch (error) {
        console.log(error)
      }
    }
    getTopRatedRecipes()
  }, [])

  return (
    <section className='mt-4 top-rated-container' style={{ textAlign: 'center' }}>
      <h1>Top Rated Recipes</h1>
      {topRated.length > 0 ?
        <Carousel fade data-bs-theme="dark" className='container my-4'>
          { topRated.map(recipe => {
            const linkUrl = `/recipes/${recipe._id}`
            return (
              <Carousel.Item key={recipe._id} className="d-flex justify-content-center">
                <Link to={linkUrl}>
                  <img src={recipe.image}></img>
                  <Carousel.Caption>
                    <h3>{recipe.title}</h3>
                    <p>{recipe.description}</p>
                  </Carousel.Caption>
                </Link>
              </Carousel.Item>
            )
          })}
        </Carousel>
        :
        <Spinner />
      }
    </section>
  )
}