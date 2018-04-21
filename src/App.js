import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { Auth } from './routes'
import './App.css'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Auth />
      </Provider>
    )
  }
}

export default App
