import React, { useState } from 'react'
import _ from 'lodash'

import ErrorList from './ErrorList'

const BracketFormTile = (props) => {
  const [newBracket, setNewBracket] = useState({
    bracket_name: "",
    bracket_bio: "",
  })

  const [ errors, setErrors ] = useState({})

  const validateForm = () => {
    let submitErrors = {}
    const requiredFields = ["bracket_name", "bracket_bio"]
    requiredFields.forEach((field) => {
      if (newBracket[field].trim() === "") {
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
    setNewBracket({
      ...newBracket,
      [event.currentTarget.name]:
      event.currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (validateForm()) {
      props.addNewBracket(newBracket)
      setNewBracket({
        bracket_name: "",
        bracket_bio: ""
      })
    }
  }

  return(
    <form onSubmit={handleSubmit}>
      <ErrorList errors={errors} />

      <label htmlFor="bracket_name">Name of bracket:
        <input
          type="text"
          name="bracket_name"
          id="bracket_name"
          value={newBracket.bracket_name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="bracket_bio">Rules for your bracket:
        <input
          type="text"
          name="bracket_bio"
          id="bracket_bio"
          value={newBracket.bracket_bio}
          onChange={handleChange}
        />
      </label>
      <input
        type="submit" value="Submit"
      />
    </form>
  )
}

export default BracketFormTile
