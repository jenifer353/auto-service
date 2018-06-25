import React from 'react'
import { withRouter } from 'react-router'
import { withStyles } from '@material-ui/core/styles'
import 'react-notifications/lib/notifications.css'
import { NotificationContainer } from 'react-notifications'
import CssBaseline from '@material-ui/core/CssBaseline'
import TopMenu from './TopMenu.jsx'
import Auth from './Auth.jsx'

const styles = theme => ({
  body: {
    paddingTop: theme.mixins.toolbar.minHeight + 10,
    maxWidth: 1200,
    margin: 'auto'
  }
})

const Root = ({ children, classes }) =>
  <div>
    <CssBaseline />
    <NotificationContainer />
    <Auth>
      <TopMenu />
      <div className={classes.body}>
        {children}
      </div>
    </Auth>
  </div>

export default withRouter(withStyles(styles)(Root))
