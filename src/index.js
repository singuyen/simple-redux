import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import configureStore from './store/configureStore'

import App from './containers/App'
import Home from './containers/Home'
import Async from './containers/Async'
import Model from './containers/Model'
import Search from './containers/Search'

import { Router, Route, hashHistory } from 'react-router'

// import 'todomvc-app-css/index.css'

const store = configureStore()

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <Route path="/async" component={Async} />
        <Route path="/search" component={Search} />
        <Route path="/make/model/:id" component={Model}/>
      </Route>

    </Router>
  </Provider>,
  document.getElementById('root')
)
