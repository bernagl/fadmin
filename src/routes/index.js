import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Dashboard, Model } from '../views'
import { Datatable } from '../components'

export const Auth = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/model" component={Model} /> */}
        <Route path="/" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  )
}

export const Application = () => {
  return (
    <React.Fragment>
      <Route path="/create-model" component={Model} />
      <Route path="/model" component={Datatable} />
    </React.Fragment>
  )
}
