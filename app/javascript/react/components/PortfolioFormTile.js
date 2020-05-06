import React, { useState } from 'react'
import _ from 'lodash'

import ErrorList from './ErrorList'

const PortfolioFormTile = (props) => {
  const [newPortfolio, setNewPortfolio] = useState({
    portfolio_name: "",
    strategy: "",
    bio: ""
  })

  const [ errors, setErrors ] = useState({})

  const validateForm = () => {
    let submitErrors = {}
    const requiredFields = ["portfolio_name", "strategy"]
    requiredFields.forEach((field) => {
      if (newPortfolio[field].trim() === "") {
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
    setNewPortfolio({
      ...newPortfolio,
      [event.currentTarget.id]:
      event.currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (validateForm()) {
      props.addNewPortfolio(newPortfolio)
      setNewPortfolio({
        portfolio_name: "",
        strategy: "",
        bio: ""
      })
    }
  }

  return(
    <form onSubmit={handleSubmit}>
      <ErrorList errors={errors} />
      <label htmlFor="portfolio_name">Name:
        <input
          type="text"
          name="portfolio_name"
          id="portfolio_name"
          value={newPortfolio.portfolio_name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="strategy">Strategy:
        <input
          type="text"
          name="strategy"
          id="strategy"
          value={newPortfolio.strategy}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="bio">Bio:
        <input
          type="text"
          name="bio"
          id="bio"
          value={newPortfolio.bio}
          onChange={handleChange}
        />
      </label>
      <input
        type="submit" value="Submit"
      />
    </form>
  )
}

export default PortfolioFormTile
