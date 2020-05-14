import React from 'react'
import {Link} from 'react-router-dom'

const PortfolioTile = (props) => {
  
  return(
    <div className="item">
    <Link to={`/brackets/${props.portfolio.bracket_id}/portfolios/${props.portfolio.id}/stocks`}>{props.portfolio.portfolio_name}</Link>
    <p>{props.portfolio.strategy}</p>
    <p>{props.portfolio.bio}</p>
    </div>
  )
}
export default PortfolioTile
