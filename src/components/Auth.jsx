import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setToken } from '../actions/auth'
import { login, register } from '../api/auth'
import { loadCurrent } from '../actions/accounts'
import LoginForm from './LoginForm.jsx'
import LinearProgress from '@material-ui/core/LinearProgress'
import RegistrationForm from './RegistrationForm'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import PersonIcon from '@material-ui/icons/Person'
import PersonAddIcon from '@material-ui/icons/PersonAdd'

class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = {
          tab: 0,
          isService: false
        }
    }

    componentWillMount() {
      const { token, loadCurrent, currentAccount } = this.props
      if (token && !currentAccount) loadCurrent()
    }

    onSuccess({ data }, dispatch) {
        dispatch(setToken(data.token))
        loadCurrent()
    }

    onTypeChange = () =>
      this.setState({ isService: !this.state.isService })

    onRegistration = (data) => {
      data.isService = this.state.isService
      if (!data.isService) delete data.address
      return register(data)
    }

    render() {
        const { token, children, currentAccount, optional } = this.props
        if (token) {
          if (currentAccount) return children
          else return <LinearProgress />
        } else if (optional) return children

        const { tab, isService } = this.state
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
                    onSubmit={login}
                    onSubmitSuccess={this.onSuccess} /> : null}

                {tab === 1 ? <RegistrationForm
                    isService={isService}
                    onTypeChange={this.onTypeChange}
                    onSubmit={this.onRegistration}
                    onSubmitSuccess={this.onSuccess} /> : null}
            </Paper>
        )
    }
}

export default connect((store) => ({
    token: store.auth.token,
    currentAccount: store.accounts.current
}),
  (dispatch) => bindActionCreators({ loadCurrent }, dispatch)
)(Auth)
