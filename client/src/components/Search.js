import Form from 'react-bootstrap/Form'

// BOOTSTRAP
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


export default function Search() {

  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <Container className="search-container">
      <form>
        <Row>
          <Col md='4'>
            <label hidden htmlFor="search-recipe">Search Recipe</label>
            <input className="form-control" type="text" placeholder="Search recipe ..." name="recipe" />
          </Col>
          <Col md='2'>
            <select className="form-control">
              <option>Category</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="diner">Diner</option>
              <option value="desert">Desert</option>
              <option value="snack">Snack</option>
            </select>
          </Col>
          <Col md='2'>
            <select className="form-control">
              <option>Diet</option>
              <option value="meat">Meat</option>
              <option value="fish">Fish</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
            </select>
          </Col>
          <Col md='2'>
            <select className="form-control">
              <option>Difficulty</option>
              <option value="easy">Easy</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </Col>
          <Col>
            <button className="btn btn-outline-dark w-100">Search</button>
          </Col>
        </Row>
      </form>
      
    </Container>
  )
}