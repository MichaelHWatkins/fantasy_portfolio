import React, {useState, useEffect } from 'react'

import BracketTile from './BracketTile'
import BracketFormTile from './BracketFormTile'

const BracketIndexContainer = props => {
  const [ brackets, setBrackets ] = useState([])
  useEffect(() => {
    fetch('/api/v1/brackets')
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
      setBrackets(body)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  const addNewBracket = (formPayload) => {
    let id = props.match.params.id
    fetch(`/api/v1/brackets.json`, {
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
      debugger
      setBrackets([
        ...brackets,
        body
      ])
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  let bracketArray = brackets.map((bracket) => {
    return(
      <BracketTile key={bracket.id} bracket={bracket} />
    )
  })

  return(
    <div>
      <h1> Current Brackets </h1>
      <BracketFormTile
      addNewBracket={addNewBracket}
      />
      {bracketArray}
    </div>
  )
}

export default BracketIndexContainer
