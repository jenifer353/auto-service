import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import auth from './auth'
import notifications from './notifications'

export default combineReducers({
    auth,
    notifications,
    form
})
