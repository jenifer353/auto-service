import React from 'react'
import { Route } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Root from './components/Root'
import Home from './components/Home'
import Requests from './components/Requests'
import ProfilePage from './components/ProfilePage'
import EditProfile from './components/EditProfile'

export default () =>
  <Provider store={store}>
    <Router>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Root>
          <Route exact path='/' component={Home} />
          <Route path='/profile/:id' component={ProfilePage} />
          <Route path='/edit-profile' component={EditProfile} />
          {<Route path='/requests' component={Requests} />}
        </Root>
      </MuiThemeProvider>
    </Router>
  </Provider>
