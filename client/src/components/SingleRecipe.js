import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

// COMPONENTS
import Spinner from './Spinner'

// BOOTSTRAP
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function SingleRecipe() {

  const [ recipe, setRecipe ] = useState()
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
      { recipe ?
        <Container>
          <Row>
            <Col><h1>{recipe.title}</h1></Col>
          </Row>
        </Container>
        :
        <Spinner />
      }
    </>
    
  )
}