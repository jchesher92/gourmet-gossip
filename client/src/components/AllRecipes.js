import { useEffect, useState } from 'react'
import axios from 'axios'

// COMPONENTS
import Search from './Search'
import Spinner from './Spinner'

// BOOTSTRAP
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// ICON
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { faFire } from '@fortawesome/free-solid-svg-icons'


export default function AllRecipes({ recipes, filteredRecipes, handleChange }) {

  return (
    <>
      <Search
        handleChange={handleChange}
      />

      { recipes.length > 0 ?
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
                  <div className='recipe-colum'>
                    <span className="star-rating">STARS</span>
                    <p className="diet-button">{diet}</p>
                    <p className="category">{category}</p>
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <FontAwesomeIcon icon={faFire} style={{ color: '#ff5f40' }} />
                    <p className="p-next-icon-first">{difficulty}</p>
                    <FontAwesomeIcon icon={faClock} style={{ color: '#FF5F40' }} />
                    <p className="p-next-icon-second">{time} min</p>
                    <button className="red-button">SEE RECIPE</button>
                  </div>
                </Col>
              )
            })}
          </Row>
        </Container>
        :
        <Spinner />
      }
    </>
  )
}