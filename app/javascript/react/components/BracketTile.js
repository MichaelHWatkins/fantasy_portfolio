import React from 'react'

const BracketTile = (props) => {
  return(
    <div className="item">
    <p>{props.bracket.bracket_name}</p>
    <p>{props.bracket.bracket_bio}</p>
    </div>
  )
}

export default BracketTile
