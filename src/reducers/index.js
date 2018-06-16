import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import auth from './auth'
import realty from './realty'
import notifications from './notifications'

export default combineReducers({
    auth,
    realty,
    notifications,
    form
})
