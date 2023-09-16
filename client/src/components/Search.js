import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

// BOOTSTRAP
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


export default function Search({ handleChange, newSearch, newCategory, newDiet, newDifficulty, resetFilters }) {

  const location = useLocation()

  return (
    <Container className="search-container">
      <form>
        <Row>
          <Col md='4'>
            <label hidden htmlFor="search-recipe">Search Recipe</label>
            <input className="form-control" type="search" placeholder="Search recipe ..." name="search" value={newSearch} onChange={handleChange} />
          </Col>
          <Col md='2'>
            <select className="form-control" name="category" value={newCategory} onChange={handleChange}>
              <option value="All">- Category -</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Diner">Diner</option>
              <option value="Desert">Desert</option>
              <option value="Snack">Snack</option>
            </select>
          </Col>
          <Col md='2'>
            <select className="form-control" name="diet" value={newDiet} onChange={handleChange}>
              <option value="All">- Diet -</option>
              <option value="Meat">Meat</option>
              <option value="Fish">Fish</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
            </select>
          </Col>
          <Col md='2'>
            <select className="form-control" name="difficulty" value={newDifficulty} onChange={handleChange}>
              <option value="All">- Difficulty -</option>
              <option value="Easy">Easy</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </Col>
          { location.pathname !== '/recipes' ? 
            <Col md='2'>
              <Link className="btn btn-outline-dark w-100" to="/recipes">Search</Link>
            </Col>
            :
            <Col md='2'>
              <Link className="btn btn-outline-dark w-100 btn-red" onClick={resetFilters}>Reset</Link>
            </Col>
          }
        </Row>
      </form>
    </Container>
  )
}