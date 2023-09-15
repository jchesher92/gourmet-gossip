import { useState } from 'react'
import Button from 'react-bootstrap/Button'

export default function FormPage({ title, formStructure, request }) {
  const [formData, setFormData] = useState({})

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const { data } = await request(formData)
      console.log(data)
    } catch (error) {
      console.log(error.message)
    }

  }

  return (
    <>
      <section className="container form-container">
        <h1>{title}</h1>
        <form>
          {
            formStructure.map((field, idx) => {
              return (
                <div className="form-floating mb-3" key={idx}>
                  <input type={field.type} className="form-control" id={field.name} name={field.name} placeholder={field.name} onChange={handleChange}></input>
                  <label htmlFor={field.name} className="form-label">{field.name}</label>
                </div>
              )
            })
          }
          <Button onClick={handleSubmit}>{title}</Button>
        </form>
      </section>
    </>
  )
}