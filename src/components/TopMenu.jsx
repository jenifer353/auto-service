import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { unsetToken } from '../actions/auth'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import HomeIcon from '@material-ui/icons/Home'
import SmsIcon from '@material-ui/icons/Sms'
import CarIcon from '@material-ui/icons/LocalCarWash'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import MenuItem from '@material-ui/core/MenuItem'
import { Link } from 'react-router-dom'
import Menu from '@material-ui/core/Menu'

const styles = theme => ({
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white
      }
    }
  },
  primary: {},
  icon: {}
})

class TopMenu extends React.Component {
    state = {
        anchorEl: null,
        menu: null
    }

    handleMainMenu = e => {
        this.setState({ anchorEl: e.currentTarget, menu: 'main'})
    }

    handleProfileMenu = e => {
        this.setState({ anchorEl: e.currentTarget, menu: 'profile'})
    }

    handleClose = () => {
        this.setState({ anchorEl: null, menu: null })
    }

    render = () => {
        const { anchorEl, menu } = this.state
        const { location, logout, classes } = this.props
        const openMainMenu = menu === 'main'
        const openProfileMenu = menu === 'profile'
        let title = 'default'

        switch(location.pathname) {
            case '/':
                title = 'Оголошення'
                break

            case '/own-realty':
                title = 'Мої оголошення'
                break

            case '/own-booking':
                title = 'Мої бронювання'
                break

            case '/profile':
                title = 'Заявки'
                break

            case '/edit-realty/new':
                title = 'Нове оголошення'
                break

            case (location.pathname.match(/^\/edit-realty\//) || {}).input:
                title = 'Редагування оголошення'
                break

            default:
                title = '???'
        }

        const menuItem = (to, Icon, title) =>
            <MenuItem
                to={to}
                onClick={this.handleClose}
                selected={location.pathname === to}
                component={Link}
                className={classes.menuItem} >
                <ListItemIcon><Icon className={classes.icon} /></ListItemIcon>
                <ListItemText classes={{ primary: classes.primary }} inset primary={title} />
            </MenuItem>

        return (
            <AppBar>
                <Toolbar>
                    <IconButton
                        aria-owns={openProfileMenu ? 'main-menu' : null}
                        aria-haspopup="true"
                        onClick={this.handleMainMenu}
                        color="inherit"
                        aria-label="Меню" >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id='main-menu'
                        anchorEl={anchorEl}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                        getContentAnchorEl={null}
                        open={openMainMenu}
                        onClose={this.handleClose} >
                        { menuItem('/', HomeIcon, 'Список сервісів') }
                        { menuItem('/requests', SmsIcon, 'Заявки') }
                        { menuItem('/current', CarIcon, 'Поточні роботи') }
                    </Menu>

                    <Typography variant="title" color="inherit" >{title}</Typography>

                    <div style={{ marginLeft: 'auto' }}>
                        <IconButton
                            aria-owns={openProfileMenu ? 'profile-menu' : null}
                            aria-haspopup="true"
                            onClick={this.handleProfileMenu}
                            color="inherit" >
                            <AccountCircle />
                        </IconButton>

                        <Menu
                            id='profile-menu'
                            anchorEl={anchorEl}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            getContentAnchorEl={null}
                            open={openProfileMenu}
                            onClose={this.handleClose} >
                            <MenuItem
                                selected={location.pathname === '/profile'}
                                onClick={this.handleClose}
                                component={Link}
                                to='/profile' >Мій профіль</MenuItem>
                            <MenuItem onClick={logout}>Вийти</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withRouter(connect(null, (dispatch) => ({
    logout: () => dispatch(unsetToken())
}))(withStyles(styles)(TopMenu)))
