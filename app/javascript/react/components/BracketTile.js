import React from 'react'
import {Link} from 'react-router-dom'

const BracketTile = (props) => {
  return(
    <div className="item">
    <Link to={`/brackets/${props.bracket.id}`}>{props.bracket.bracket_name}</Link>
    <p>{props.bracket.bracket_bio}</p>
    </div>
  )
}

export default BracketTile
