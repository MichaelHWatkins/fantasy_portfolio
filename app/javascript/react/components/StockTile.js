import React from 'react'

const StockTile = (props) => {
  return(
    <div className="item">
    <p>{props.option.symbol}</p>
    <p>{props.option.value}</p>
    </div>
  )
}

export default StockTile
