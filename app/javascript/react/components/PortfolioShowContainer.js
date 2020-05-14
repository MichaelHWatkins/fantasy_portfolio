import React, {useState, useEffect } from 'react'
import {Redirect} from "react-router-dom"
import StockTile from './StockTile'
import StockFormTile from './StockFormTile'
import {Link} from 'react-router-dom'

const PortfolioShowContainer = props => {
  const [ stocks, setStocks ] = useState([])
  const [redirect, shouldRedirect] = useState(false)

  let bracket_id = props.match.params.bracket_id

  useEffect(() => {
    let id = props.match.params.id
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

  const deleteStock = () => {
    let portfolio_id = props.match.params.id
    let bracket_id = props.match.params.bracket_id
    fetch(`/api/v1/brackets/${bracket_id}/portfolios/${portfolio_id}`, {
      credentials: "same-origin",
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      }
    })
    .then(() => {
      shouldRedirect(true)
    })
  }

  if (redirect) {
    return <Redirect to='/' />
  }

  const confirmDelete = () => {
    let confirmMessage = confirm("Do you want to delete this item?")
    if (confirmMessage === true) {
      deleteStock()
    }
  }

  let deleteButton = (
       <button className="delete button" onClick={confirmDelete}>Delete Portfolio</button>
     )
  
  return(
    <div>
    <h1>Stocks</h1>
    <StockFormTile
    addNewStock={addNewStock}
    />
    {stockArray}
    {deleteButton}
    <Link to={`/brackets/${bracket_id}`}>Back to Portfolios</Link>

    </div>
  )
}

export default PortfolioShowContainer
