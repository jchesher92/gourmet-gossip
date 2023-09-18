import RecipeOfDay from './RecipeOfDay'
import Search from './Search'
import TopRated from './TopRated'
import HeaderPicture from './HeaderPicture'

// BOOTSTRAP
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


export default function Home({ handleChange, newSearch }) {
  return (
    <>
      <HeaderPicture />
      <Container>
        <Row>
          <Search
            handleChange={handleChange}
            newSeach={newSearch} />
        </Row>
        <Row>
          <TopRated />
        </Row>
        <Row>
          <RecipeOfDay />
        </Row>
      </Container>
    </>
  )
}