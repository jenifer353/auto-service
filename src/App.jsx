import React from 'react'
import { Route } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import { NotificationContainer } from 'react-notifications'

import 'react-notifications/lib/notifications.css'
import CssBaseline from '@material-ui/core/CssBaseline'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Auth from './components/Auth.jsx'
import TopMenu from './components/TopMenu.jsx'

import Home from './components/Home.jsx'
import ProfilePage from './components/ProfilePage.jsx'

export default () =>
  <Provider store={store}>
    <Router>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <CssBaseline />
          <NotificationContainer />
          <Auth>
            <TopMenu />
            <div style={{ paddingTop: '56px' }}>
              <Route exact path='/' component={Home} />
              <Route path='/profile' component={ProfilePage} />
            </div>
          </Auth>
        </div>
      </MuiThemeProvider>
    </Router>
  </Provider>
