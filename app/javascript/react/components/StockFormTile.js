import React, { useState, useEffect } from 'react'
import _ from 'lodash'

import ErrorList from './ErrorList'

const StockFormTile = (props) => {
  const [newStock, setNewStock] = useState({
    name: "",
  })

  const [ errors, setErrors ] = useState({})

  const validateForm = () => {
    let submitErrors = {}
    const requiredFields = ["name"]
    requiredFields.forEach((field) => {
      if (newStock[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: 'must be filled in'
        }
      }
    })
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const handleChange = (event) => {
    setNewStock({
      ...newStock,
      [event.currentTarget.name]:
      event.currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (validateForm()) {
      props.addNewStock(newStock.name)
      setNewStock({
        name: ""
      })
    }
  }
  return(
  <form onSubmit={handleSubmit}>
    <ErrorList errors={errors} />

    <label htmlFor="name">Stock Symbol:
      <input
        type="text"
        name="name"
        id="name"
        value={newStock.name}
        onChange={handleChange}
      />
    </label>
    <input
      type="submit" value="Submit"
    />
  </form>
  )
}

export default StockFormTile
