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
import EditPage from './components/EditPage'
import Requests from './components/Requests'
import OwnBooking from './components/OwnBooking'
import ProfilePage from './components/ProfilePage'

const withAuth = (Component) => () =>
  <Auth><Component/></Auth>

export default () =>
  <Provider store={store}>
    <Router>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Root>
          <Route exact path='/' component={Home} />
          <Route path='/edit-realty/:id' component={withAuth(EditPage)} />
          <Route path='/profile' component={withAuth(ProfilePage)} />
          <Route path='/requests' component={withAuth(Requests)} />
          <Route path='/own-booking' component={withAuth(OwnBooking)} />
        </Root>
      </MuiThemeProvider>
    </Router>
  </Provider>
