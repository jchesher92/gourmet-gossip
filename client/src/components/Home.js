import RecipeOfDay from './RecipeOfDay'
import Search from './Search'
import TopRated from './TopRated'

// BOOTSTRAP
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


export default function Home() {
  return (
    <Container>
      <Row>
        <Col><h1>Home</h1></Col>
      </Row>
      <Row>
        <Search />
      </Row>
      <Row>
        <TopRated />
      </Row>
      <Row>
        <RecipeOfDay />
      </Row>
    </Container>
  )
}