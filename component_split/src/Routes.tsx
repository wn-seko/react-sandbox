import React, { FC } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Top from './pages/Top'
import TodoPage from './pages/Todo'

const Routes: FC = () => {
  return (
    <Switch>
      <Route exact={true} path="/" component={Top} />
      <Route exact={true} path="/todos" component={TodoPage} />
      <Route path="*" render={() => <Redirect to="/" />} />
    </Switch>
  )
}

export default Routes
