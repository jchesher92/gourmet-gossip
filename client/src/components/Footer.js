import { Link } from 'react-router-dom'

// ICON
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

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
            <p>
              <Link target="_blank" to="https://github.com/parkeralexjm">
                <FontAwesomeIcon icon={faGithub} style={{ color: '#fff' }} /> Alex Parker</Link>
            </p>
            <p>
              <Link target="_blank" to="https://github.com/jchesher92">
                <FontAwesomeIcon icon={faGithub} style={{ color: '#fff' }} /> James Chesher</Link>
            </p>
            <p>
              <Link target="_blank" to="https://github.com/nadjaob">
                <FontAwesomeIcon icon={faGithub} style={{ color: '#fff' }} /> Nadja Oblaender</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}