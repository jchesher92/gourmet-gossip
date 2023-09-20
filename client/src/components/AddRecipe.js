import FormPageRecipe from './FormPageRecipe'
import axios from 'axios'
import { useState } from 'react'

// Utils
import { getToken } from '../utility/auth'

export default function AddRecipe() {
  const [formStructure, setFormStructure] = useState([
    {
      type: 'text',
      name: 'Title',
    },
    {
      type: 'select',
      name: 'Category',
      options: ['Breakfast', 'Lunch', 'Dinner', 'Desert', 'Snack'],
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
      options: ['Easy', 'Intermediate'],
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


  function addRecipe(formData) {
    return axios.post('/api/recipes', formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
  }

  return (
    <FormPageRecipe title='Add Recipe' formStructure={formStructure} setFormStructure={setFormStructure} request={addRecipe} redirect="/recipes" />
  )
}