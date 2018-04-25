import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Dashboard } from '../views'
import { Datatable, FormModel } from '../components'

export const Auth = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  )
}

export const Application = () => {
  return (
    <React.Fragment>
      <Route path="/create-model" component={FormModel} />
      <Route path="/model/:name" component={Datatable} />
    </React.Fragment>
  )
}
