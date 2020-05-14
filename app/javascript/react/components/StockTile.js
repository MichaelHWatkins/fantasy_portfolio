import React from 'react'
import {Link} from 'react-router-dom'

const StockTile = (props) => {
  return(
    <div className="item">
    <Link to={`/brackets/${props.option.bracket_id}/portfolios/${props.option.portfolio_id}/stocks/${props.option.id}`}>{props.option.symbol}</Link>
    <p>{props.option.points}</p>
    </div>
  )
}

export default StockTile
