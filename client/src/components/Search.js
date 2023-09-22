import { Link, useLocation } from 'react-router-dom'

// BOOTSTRAP
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import headerPicture from '../images/header-wood.jpg'

// FORM
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'

export default function Search({ handleChange, newSearch, newCategory, newDiet, newDifficulty, resetFilters }) {

  const location = useLocation()

  return (
    <Container className="search-container">
      <div className='header-picture'>
        <img src={headerPicture} />
      </div>
      <Form>
        <Row className='search-row'>
          {/* SEARCH */}
          <Col md='4' className='mb-2'>
            <FloatingLabel label='Search recipe'>
              <Form.Control className="form-control" type="search" placeholder="Search recipe ..." name="search" value={newSearch} onChange={handleChange} />
            </FloatingLabel>
          </Col>
          {/* CATEGORY */}
          <Col md='2' className='mb-2'>
            <FloatingLabel label=''>
              <Form.Control as='select' className="form-control" name="category" value={newCategory} onChange={handleChange} aria-label="Floating label select example" >
                <option value='All'>- Category -</option>
                <option value='Breakfast'>Breakfast</option>
                <option value='Lunch'>Lunch</option>
                <option value='Dinner'>Dinner</option>
                <option value='Dessert'>Dessert</option>
                <option value='Snack'>Snack</option>
              </Form.Control>
            </FloatingLabel>
          </Col>
          {/* DIET */}
          <Col md='2' className='mb-2'>
            <FloatingLabel label=''>
              <Form.Control as='select' className="form-control" name="diet" value={newDiet} onChange={handleChange} aria-label="Floating label select example">
                <option value='All'>- Diet -</option>
                <option value='Meat'>Meat</option>
                <option value='Fish'>Fish</option>
                <option value='Vegetarian'>Vegetarian</option>
                <option value='Vegan'>Vegan</option>
              </Form.Control>
            </FloatingLabel>
          </Col>
          {/* DIFFICULTY */}
          <Col md='2' className='mb-2'>
            <FloatingLabel label=''>
              <Form.Control as='select' className="form-control" name="difficulty" value={newDifficulty} onChange={handleChange} aria-label="Floating label select example">
                <option value='All'>- Difficulty -</option>
                <option value='Easy'>Easy</option>
                <option value='Medium'>Medium</option>
              </Form.Control>
            </FloatingLabel>
          </Col>
          {location.pathname !== '/recipes' ?
            <Col md='2'>
              <Link className="btn btn-outline-dark w-100 search-btn" to="/recipes">Search</Link>
            </Col>
            :
            <Col md='2'>
              <Link className="btn btn-outline-dark w-100 btn-red search-btn" onClick={resetFilters}>Reset</Link>
            </Col>
          }
        </Row>
      </Form>
    </Container>
  )
}