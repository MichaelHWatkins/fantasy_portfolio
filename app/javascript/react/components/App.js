import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import BracketIndexContainer from './BracketIndexContainer'
import BracketShowContainer from './BracketShowContainer'
import PortfolioShowContainer from './PortfolioShowContainer'

export const App = (props) => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={BracketIndexContainer} />
          <Route exact path='/brackets' component={BracketIndexContainer} />
          <Route exact path='/brackets/:id' component={BracketShowContainer} />
          <Route exact path='/brackets/:bracket_id/portfolios/:id/stocks' component={PortfolioShowContainer} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
