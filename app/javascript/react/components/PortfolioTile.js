import React from 'react'

const PortfolioTile = (props) => {
  return(
    <div className="item">
    <p>{props.portfolio.portfolio_name}</p>
    <p>{props.portfolio.strategy}</p>
    </div>
  )
}

export default PortfolioTile
