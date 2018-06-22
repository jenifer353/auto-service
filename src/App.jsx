import React from 'react'
import { Route } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Root from './components/Root.jsx'
import Home from './components/Home.jsx'
import ProfilePage from './components/ProfilePage.jsx'

export default () =>
  <Provider store={store}>
    <Router>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Root>
          <Route exact path='/' component={Home} />
          <Route path='/profile' component={ProfilePage} />
        </Root>
      </MuiThemeProvider>
    </Router>
  </Provider>
