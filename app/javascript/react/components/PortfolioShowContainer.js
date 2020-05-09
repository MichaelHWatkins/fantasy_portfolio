import React, {useState, useEffect } from 'react'

import StockTile from './StockTile'
import StockFormTile from './StockFormTile'

const PortfolioShowContainer = props => {
  const [ stocks, setStocks ] = useState([])
  useEffect(() => {
    let id = props.match.params.id
    let bracket_id = props.match.params.bracket_id
    fetch(`/api/v1/brackets/${bracket_id}/portfolios/${id}/stocks`)
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
      setStocks(body)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  const addNewStock = (formPayload) => {
    let bracket_id = props.match.params.bracket_id
    let portfolio_id = props.match.params.id
    fetch(`/api/v1/brackets/${bracket_id}/portfolios/${portfolio_id}/stocks`, {
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
      setStocks([
        ...stocks,
        body
      ])
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }
  let stockArray = ""
  if (stocks.length > 0) {
    stockArray = stocks.map((option) => {
      return(
        <StockTile key={option.id} option={option} />
      )
    })
  }
  return(
    <div>
    <h1>Stocks</h1>
    <StockFormTile
    addNewStock={addNewStock}
    />
    {stockArray}
    </div>
  )
}

export default PortfolioShowContainer
