import React from 'react'
import { Route } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Root from './components/Root'
import Home from './components/Home'
import EditPage from './components/EditPage'
import OwnRealty from './components/OwnRealty'
import OwnBooking from './components/OwnBooking'
import ProfilePage from './components/ProfilePage'

export default () =>
  <Provider store={store}>
    <Router>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Root>
          <Route exact path='/' component={Home} />
          <Route path='/edit-realty/:id' component={EditPage} />
          <Route path='/profile' component={ProfilePage} />
          <Route path='/own-realty' component={OwnRealty} />
          <Route path='/own-booking' component={OwnBooking} />
        </Root>
      </MuiThemeProvider>
    </Router>
  </Provider>
