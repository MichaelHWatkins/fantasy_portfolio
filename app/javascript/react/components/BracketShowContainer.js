import React, {useState, useEffect } from 'react'
import {Link} from 'react-router-dom'

import PortfolioTile from './PortfolioTile'
import PortfolioFormTile from './PortfolioFormTile'

const BracketShowContainer = props => {

  const [ portfolios, setPortfolios ] = useState([])
  const [ bracket, setBracket ] = useState({})
  useEffect(() => {
    let id = props.match.params.id
    fetch(`/api/v1/brackets/${id}`)
    .then((response) => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw(error);
      }
    })
    .then((response) => {
      return response.json()
    })
    .then((body) => {
      setBracket(body.bracket)
      setPortfolios(body.portfolios)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  const addNewPortfolio = (formPayload) => {
    let id = props.match.params.id
    fetch(`/api/v1/brackets/${id}/portfolios.json`, {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify(formPayload),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        let error = new Error(errorMessage)
        throw(error)
      }
    })
    .then((response) => response.json())
    .then(body => {
      setPortfolios([
        ...portfolios,
        body
      ])
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  let portfolioArray = ""
  if (portfolios.length > 0) {
    portfolioArray = portfolios.map((portfolio) => {
      return(
        <PortfolioTile key={portfolio.id} portfolio={portfolio} />

      )
    })
  }

  return(
    <div>
    <h1>Portfolios</h1>
    <PortfolioFormTile
    addNewPortfolio={addNewPortfolio}
    />
    {portfolioArray}
    <Link to={`/`}>Back to Brackets</Link>
    </div>
  )
}

export default BracketShowContainer
