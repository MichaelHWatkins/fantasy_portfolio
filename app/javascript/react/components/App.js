import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import BracketIndexContainer from './BracketIndexContainer'
import BracketShowContainer from './BracketShowContainer'

export const App = (props) => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={BracketIndexContainer} />
          <Route exact path='/brackets' component={BracketIndexContainer} />
          <Route exact path='/brackets/:id' component={BracketShowContainer} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
