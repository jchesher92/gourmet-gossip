import Col from 'react-bootstrap/esm/Col'
import { Link } from 'react-router-dom'
import { UserContext } from '../App.js'
import { useContext } from 'react'
import { getToken } from '../utility/auth.js'
import { useState, useEffect } from 'react'
import axios from 'axios'

// ICON
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faFire, faStar } from '@fortawesome/free-solid-svg-icons'

export default function RecipeCard({ recipe }) {
  const linkUrl = `/recipes/${recipe._id}`
  const { user, setUser } = useContext(UserContext)

  return (
    <Col
      lg='3'
      md='4'
      sm='6'
      className="recipes-flex favorites-icon-container"
    >
      <img src={recipe.image} />
      <p className="diet-button-recipecard">{recipe.diet}</p>
      <div className='recipe-colum'>
        <div className='category-rating'>
          <p className="category">{recipe.category}</p>
          <p className='rating-star'>{recipe.avgRating}<FontAwesomeIcon icon={faStar} size="xs" style={{ color: '#212529' }} className='ps-1' /></p>
        </div>
        <div className='same-colum-height'>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
        <div className='d-flex difficulty'>
          <div>
            <FontAwesomeIcon icon={faFire} style={{ color: '#ff5f40' }} />
            <p className="p-next-icon-first">{recipe.difficulty}</p>
          </div>
          <div>
            <FontAwesomeIcon icon={faClock} style={{ color: '#FF5F40' }} />
            <p className="p-next-icon-second">{recipe.time} min</p>
          </div>
        </div>
        <div className='container-recipe-buttons mt-1'>
          <Link to={linkUrl} className="red-button">SEE RECIPE</Link>
          {/* <div className='trash-edit-icons'><Link onClick={deleteItem}>{ recipe.addedBy === profile._id && <FontAwesomeIcon icon={faTrashCan} size='xl' style={{ color: '#ff5f40' }} /> }</Link></div> */}
        </div>
      </div>
    </Col>
  )

}
