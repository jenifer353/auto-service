import React from 'react'
import { Route } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { withRouter } from 'react-router'
import store from './store'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Auth from './components/Auth.jsx'
import Root from './components/Root'
import Home from './components/Home'
// import Requests from './components/Requests'
import ProfilePage from './components/ProfilePage'
import EditProfile from './components/EditProfile'

const withAuth = (Component) => () => {
  const RComponent = withRouter(Component)
  return <Auth><RComponent/></Auth>
}

const optionalAuth = (Component) => () =>{
  const RComponent = withRouter(Component)
  return <Auth optional><RComponent/></Auth>
}

export default () =>
  <Provider store={store}>
    <Router>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Root>
          <Route exact path='/' component={optionalAuth(Home)} />
          <Route path='/profile' component={withAuth(ProfilePage)} />
          <Route path='/edit-profile' component={withAuth(EditProfile)} />
          {/*<Route path='/requests' component={withAuth(Requests)} />*/}
        </Root>
      </MuiThemeProvider>
    </Router>
  </Provider>
