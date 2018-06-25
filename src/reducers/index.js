import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import auth from './auth'
import accounts from './accounts'
import reviews from './reviews'
import notifications from './notifications'

export default combineReducers({
    auth,
    accounts,
    reviews,
    notifications,
    form
})
