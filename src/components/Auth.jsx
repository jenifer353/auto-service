import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setToken } from '../actions/auth.js'
import authApi from '../api/auth.js'
import LoginForm from './LoginForm.jsx'
import RegistrationForm from './RegistrationForm.jsx'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import PersonIcon from '@material-ui/icons/Person'
import PersonAddIcon from '@material-ui/icons/PersonAdd'

class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = { tab: 0 }
    }

    onSuccess({ data }, dispatch) {
        dispatch(setToken(data.token))
    }

    render() {
        if (this.props.token) return this.props.children
        const { tab } = this.state
        return (
            <Paper style={{ maxWidth: '600px', margin: 'auto', padding: '10px'}}>
                <Typography variant='display1' align='center'>Авторизуйтесь аби продовжити!</Typography>
                <Tabs
                  value={tab}
                  onChange={(e, value) => this.setState({ tab: value })}
                  indicatorColor="primary"
                  textColor="primary"
                  fullWidth
                  centered >
                  <Tab icon={<PersonIcon/>} label="Вхід" />
                  <Tab icon={<PersonAddIcon />} label="Реєстрація" />
                </Tabs>

                {tab === 0 ? <LoginForm
                    onSubmit={authApi.login}
                    onSubmitSuccess={this.onSuccess} /> : null}

                {tab === 1 ? <RegistrationForm
                    onSubmit={authApi.register}
                    onSubmitSuccess={this.onSuccess} /> : null}
            </Paper>
        )
    }
}

export default connect((store) => ({
    token: store.auth.token
}))(Auth)
