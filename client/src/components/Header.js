import { Link } from 'react-router-dom'

// ICON
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

// BOOTSTRAP
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Header() {
  return (
    <header>
      <Container className='header'>
        <Row>
          <Col md='5'><Link to='/'><h1>Gourmet Gossip</h1></Link></Col>
          <Col md='7' className='navbar-right'>
            <Link to='/recipes'>All recipes</Link>
            <Link to='/'><FontAwesomeIcon icon={faUser} size='lg' style={{ color: '#fff' }} /></Link>
          </Col>
        </Row>
      </Container>
    </header>
  )
}