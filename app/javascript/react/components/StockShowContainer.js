import React, {useState, useEffect } from 'react'
import {Link} from 'react-router-dom'

const StockShowContainer = props => {
  const [ stockInfo, setStockInfo ] = useState({})

  let id = props.match.params.id
  let portfolio_id = props.match.params.portfolio_id
  let bracket_id = props.match.params.bracket_id
  useEffect(() => {

    fetch(`/api/v1/brackets/${bracket_id}/portfolios/${portfolio_id}/stocks/${id}`)
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
      setStockInfo(body)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  const editStock = () => {
    let id = props.match.params.id
    let portfolio_id = props.match.params.portfolio_id
    let bracket_id = props.match.params.bracket_id
    fetch(`/api/v1/brackets/${bracket_id}/portfolios/${portfolio_id}/stocks/${id}`, {
      credentials: "same-origin",
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify()
    })
    .then((response) => response.json())
    .then((body) => {
      setStockInfo(body)
    })
  }
  let editButton = (
       <button className="button" onClick={editStock}>Update Stock</button>
     )
  return (
    <div>
    <h1>Stock Stats</h1>
    <p>{stockInfo.symbol}</p>
    <p>{stockInfo.points}</p>
    {editButton}
    <Link to={`/brackets/${bracket_id}/portfolios/${portfolio_id}/stocks`}>Back to Stocks</Link>

    </div>
  )
}

export default StockShowContainer
