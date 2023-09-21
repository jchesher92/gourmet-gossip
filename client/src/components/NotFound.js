import burntFood from '../images/burnt-food.gif'

// BOOTSTRAP
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function NotFound() {
  return (
    <Container className='not-found-container'>
      <Row>
        <Col className='not-found-content'>
          <h1 className='mb-4'>404 Page not found!</h1>
          <img src={burntFood} />
        </Col>
      </Row>
    </Container>
  )
}