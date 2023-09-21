import FormPageRecipe from './FormPageRecipe'
import axios from 'axios'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

// Utils
import { getToken } from '../utility/auth'

export default function UpdateRecipe() {

  const { id } = useParams()

  const [formStructure, setFormStructure] = useState([
    {
      type: 'text',
      name: 'Title',
    },
    {
      type: 'select',
      name: 'Category',
      options: ['Breakfast', 'Lunch', 'Diner', 'Desert', 'Snack'],
    },
    {
      type: 'text',
      name: 'Description',
    },
    {
      type: 'select',
      name: 'Diet',
      options: ['Meat', 'Fish', 'Vegetarian', 'Vegan'],
    },
    {
      type: 'select',
      name: 'Difficulty',
      options: ['Easy', 'Intermediate', 'Advanced'],
    },
    {
      type: 'number',
      name: 'Time',
    },
    {
      type: 'textarea',
      name: 'Method',
    },
    {
      type: 'number',
      name: 'Serves',
    },
    {
      type: 'text-list',
      name: 'Ingredients',
      ingredients: [{ name: '', amount: '' }],
    },
    // {
    //   type: 'textarea',
    //   name: 'Ingredients',
    // },
    {
      type: 'file',
      name: 'Image',
    }
  ])


  function updateRecipe(formData) {
    return axios.put(`/api/recipes/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
  }

  function getRecipeData() {
    return axios.get(`/api/recipes/${id}`)
  }

  return (
    <FormPageRecipe title='Update your Recipe' formStructure={formStructure} setFormStructure={setFormStructure} request={updateRecipe} redirect={`/recipes/${id}`} onLoad={getRecipeData} />
  )
}