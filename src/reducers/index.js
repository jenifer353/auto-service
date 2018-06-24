import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import auth from './auth'
import realty from './realty'
import accounts from './accounts'
import reviews from './reviews'
import notifications from './notifications'

export default combineReducers({
    auth,
    realty,
    accounts,
    reviews,
    notifications,
    form
})
