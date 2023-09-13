import { useEffect } from 'react'
import axios from 'axios'

export default function App() {
  useEffect(() => {
    async function getData(){
      try {
        await axios.get('/api/products') // <---- Replace with your endpoint to test the proxy
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  return <h1>Hello World</h1>
}
