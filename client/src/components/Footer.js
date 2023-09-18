import { Link } from 'react-router-dom'

// BOOTSTRAP
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Footer() {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='footer'>
            <h6>Project by</h6>
            <p><Link target="_blank" to="https://github.com/parkeralexjm">Alex Parker</Link></p>
            <p><Link target="_blank" to="https://github.com/jchesher92">James Chesher</Link></p>
            <p><Link target="_blank" to="https://github.com/nadjaob">Nadja Oblaender</Link></p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}