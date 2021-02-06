import React, { FC } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Hello from './pages/Hello'

const Routes: FC = () => {
  return (
    <Switch>
      <Route exact={true} path="/" component={Hello} />
      <Route path="*" render={() => <Redirect to="/" />} />
    </Switch>
  )
}

export default Routes
