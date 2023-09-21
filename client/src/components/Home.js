import RecipeOfDay from './RecipeOfDay'
import Search from './Search'
import TopRated from './TopRated'

// BOOTSTRAP
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

export default function Home({ handleChange, newSearch }) {
  return (
    <>
      <Search
        handleChange={handleChange}
        newSeach={newSearch} />
      <TopRated />
      <RecipeOfDay />
    </>
  )
}