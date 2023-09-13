import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// BOOTSTRAP
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Header() {
  return (
    <header>
      <Container className='header'>
        <Row>
          <Col md='5'><h1>Gourmet Gossip</h1></Col>
          <Col md='7' className='navbar-right'>
            <FontAwesomeIcon icon="fa-solid fa-user" style={{ color: '#ffffff' }} />
            <FontAwesomeIcon icon="fa-solid fa-check-square" />
            <Link to='/recipes'>All recipes</Link>
            <Link to='/'></Link>
            
          </Col>
        </Row>
      </Container>
    </header>
  )
}