import React from 'react'
import { connect } from 'react-redux'
import { unsetToken } from '../actions/auth'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'


class TopMenu extends React.Component {
    state = {
        anchorEl: null
    }

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget })
    }

    handleClose = () => {
        this.setState({ anchorEl: null })
    }

    render = () => {
        const { anchorEl } = this.state
        const { title, logout } = this.props
        const open = Boolean(anchorEl)

        return (
            <AppBar>
                <Toolbar>
                    <IconButton color="inherit" aria-label="Меню">
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="title"color="inherit" >{title}</Typography>

                    <div style={{ marginLeft: 'auto' }}>
                        <IconButton
                            aria-owns={open ? 'menu-appbar' : null}
                            aria-haspopup="true"
                            onClick={this.handleMenu}
                            color="inherit" >
                            <AccountCircle />
                        </IconButton>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={this.handleClose} >
                            <MenuItem onClick={this.handleClose}>Мої профіль</MenuItem>
                            <MenuItem onClick={logout}>Вийти</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        )
    }
}

export default connect(null, (dispatch) => ({
    logout: () => dispatch(unsetToken())
}))(TopMenu)
