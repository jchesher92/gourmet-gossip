import headerPicture from '../images/food.jpg'

// BOOTSTRAP
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

export default function HeaderPicture() {
  return (
    <Container fluid className='header-picture'>
      <Row>
        <img src={headerPicture} />
      </Row>
    </Container>
  )
}