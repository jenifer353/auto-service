import React from 'react'
import { Route } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Auth from './components/Auth.jsx'
import Root from './components/Root'
import Home from './components/Home'
// import Requests from './components/Requests'
import ProfilePage from './components/ProfilePage'

const withAuth = (Component) => () =>
  <Auth><Component/></Auth>

const optionalAuth = (Component) => () =>
  <Auth optional><Component/></Auth>

export default () =>
  <Provider store={store}>
    <Router>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Root>
          <Route exact path='/' component={optionalAuth(Home)} />
          <Route path='/profile' component={withAuth(ProfilePage)} />
          {/*<Route path='/requests' component={withAuth(Requests)} />*/}
        </Root>
      </MuiThemeProvider>
    </Router>
  </Provider>
