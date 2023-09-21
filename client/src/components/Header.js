import { Link, NavLink } from 'react-router-dom'
import { useState, useContext } from 'react'
import { UserContext } from '../App'
import { deleteToken } from '../utility/auth'
import headerPicture from '../images/food.jpg'

// ICON
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

// BOOTSTRAP
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'

export default function Header({ resetFilters }) {
  const { user, setUser } = useContext(UserContext)

  return (
    <header>
      <Container className='header'>
        <Row>
          <Col><Link to='/' onClick={resetFilters}><p>Gourmet Gossip</p></Link></Col>
          <Col className='navbar-right'>
            <NavLink to='/recipes'>All recipes</NavLink>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic"><FontAwesomeIcon icon={faUser} size='lg' style={{ color: '#fff' }} /></Dropdown.Toggle>
              <Dropdown.Menu>
                {user ?
                  <>
                    <Dropdown.Item as={NavLink} to="/profile">Profile</Dropdown.Item>
                    <Dropdown.Item as={NavLink} to="/favorites">Favorites</Dropdown.Item>
                    <Dropdown.Item as={NavLink} to="/recipes/add">Add Recipe</Dropdown.Item>
                    <Dropdown.Item as={NavLink} to="/" onClick={() => {
                      setUser(false)
                      deleteToken()
                    }}>Logout</Dropdown.Item>
                  </>
                  :
                  <>
                    <Dropdown.Item as={NavLink} to="/login">Login</Dropdown.Item>
                    <Dropdown.Item as={NavLink} to="/register">Register</Dropdown.Item>
                  </>
                }
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>
    </header>
  )
}