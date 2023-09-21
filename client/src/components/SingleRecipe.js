import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../App.js'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

// COMPONENTS
import Spinner from './Spinner'

// BOOTSTRAP
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import FormRange from 'react-bootstrap/FormRange'
import { Range } from 'react-range'

// ICON
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire, faUtensils, faStar, faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'

// Utils
import { getToken, setToken } from '../utility/auth'
import { trusted } from 'mongoose'

export default function SingleRecipe() {

  const [recipe, setRecipe] = useState()
  const [formData, setFormData] = useState({ rating: 5 })
  const [errorMessage, setErrorMessage] = useState('')
  const [validated, setValidated] = useState(false)
  const [newCommentInput, setNewCommentInput] = useState('')
  const [newRatingInput, setNewRatingInput] = useState('')
  const [reviewSent, setReviewSent] = useState(false)
  const [reviewDeleted, setReviewDeleted] = useState(false)
  const redirect = useNavigate()

  const { user, setUser } = useContext(UserContext)
  const { id } = useParams()
  const urlToUpdate = `/recipes/${id}/update`

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
  }, [reviewSent, reviewDeleted])

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setReviewSent(false)
    setErrorMessage('')
    if (e.target.name === 'comment') {
      setNewCommentInput(e.target.value)
    } else if (e.target.name === 'rating') {
      setNewRatingInput(e.target.value)
    }
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
      const { data } = await axios.post(`/api/recipes/${id}/reviews`, formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      setReviewSent(true)
      setNewCommentInput('')
      setNewRatingInput('')
      setValidated('')
      // if (data.token) {
      //   setToken(data.token)
      //   setUser(true)
      // }
      setFormData({ rating: 5 })
    } catch (error) {
      console.log(error)
      setErrorMessage(error.response.data.error)
    }
  }


  // DELETE RECIPE

  const [profile, setProfile] = useState({})
  const token = getToken()

  useEffect(() => {
    async function getUserProfile() {
      try {
        if (token) {
          const { data: profile } = await axios.get('/api/profile', {
            headers: {
              'Authorization': token,
            },
          })
          setProfile(profile)
          console.log('profile', profile)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getUserProfile()
  }, [])

  function deleteItem() {
    async function deleteRecipe() {
      try {
        const { data } = await axios.delete(`/api/recipes/${id}`, {
          headers: {
            'Authorization': token,
          },
        })
        redirect('/profile')
      } catch (error) {
        console.log(error)
      }
    }
    deleteRecipe()
  }

  const deleteReview = (e, index) => {
    setReviewDeleted(false)
    e.preventDefault()
    const reviewId = recipe.reviews[index]._id
    async function deleteReviewNow() {
      try {
        const { data } = await axios.delete(`/api/recipes/${id}/reviews/${reviewId}`, {
          headers: {
            'Authorization': token,
          },
        })
        setReviewDeleted(true)
      } catch (error) {
        console.log(error)
      }
    }
    deleteReviewNow()
  }

  return (
    <>
      {recipe ?
        <Container className='single-recipe-container'>
          <Row>
            <Col md='6' sm='12'>
              <>
                <img src={recipe.image}></img>
                <div className='mt-3 mb-3'>
                  <FontAwesomeIcon icon={faFire} style={{ color: '#ff5f40' }} />
                  <p className="p-next-icon-first">{recipe.difficulty}</p>
                  <FontAwesomeIcon icon={faClock} style={{ color: '#FF5F40' }} />
                  <p className="p-next-icon-first">{recipe.time} min</p>
                  <FontAwesomeIcon icon={faUtensils} style={{ color: '#FF5F40' }} />
                  <p className="p-next-icon-first">{recipe.serves} serves</p>
                  <FontAwesomeIcon icon={faStar} style={{ color: '#FF5F40' }} />
                  <p className="p-next-icon-first">{recipe.avgRating}</p>
                </div>
              </>
            </Col>
            <Col md='6' sm='12'>
              <div className='diet-icon-container'>
                <p className='diet-button'>{recipe.diet}</p>
                { (recipe.addedBy._id === profile._id) &&
                <div className='trash-edit-icons'>
                  <Link to={urlToUpdate}>
                    <FontAwesomeIcon icon={faPen} size='xl' style={{ color: '#ff5f40' }} />
                  </Link>
                  <Link onClick={deleteItem}>
                    <FontAwesomeIcon icon={faTrashCan} size='xl' style={{ color: '#ff5f40' }} />
                  </Link>
                </div>
                }
              </div>
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
          <Row className='space-above-method mb-3'>
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
                  <p>by {recipe.reviews[index].addedBy.username}</p>
                  {(review.addedBy._id === profile._id) && 
                    <>
                      <div className='trash-icon'>
                        <FontAwesomeIcon onClick={(e) => deleteReview(e, index)} icon={faTrashCan} style={{ color: '#fff' }} />  
                      </div> 
                    </>          
                  }
                </Col>
              </Row>
            )
          })}
          { (user && (recipe.addedBy._id !== profile._id)) &&
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className='mt-4'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label className='fw-bold'>Write a review</Form.Label>
                  <Form.Control as="textarea" rows={3} onChange={handleChange} value={newCommentInput} name='comment' required />
                  <Form.Control.Feedback type="invalid">Review is required.</Form.Control.Feedback>
                </Form.Group>
                <Row className='submit-review-container'>
                  <Col md='4'>
                    <Form.Group>
                      <Form.Label className='fw-bold'>Select a rating </Form.Label>
                      <Form.Range
                        min={1}
                        max={5}
                        defaultValue='5'
                        list="markers"
                        onChange={handleChange}
                        name='rating'
                        style={{ background: '#000', appearance: 'auto' }}
                        color='black'
                      />
                      <datalist id="markers" className='input-range' >
                        <option value='1' label='1'></option>
                        <option value='2' label='2'></option>
                        <option value='3' label='3'></option>
                        <option value='4' label='4'></option>
                        <option value='5' label='5'></option>
                      </datalist>
                    </Form.Group>
                  </Col>
                  <Row className='mt-4'>
                    <Col>
                      <Form.Group>
                        <Button type="submit" className='submit-review'>Add review</Button>
                      </Form.Group>
                    </Col>
                  </Row>
                </Row>
              </Row>
            </Form>
          }
        </Container>
        :
        <Spinner />
      }
    </>

  )
}