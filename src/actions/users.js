import * as usersApi from '../api/users'
import {
    LOAD_USERS,
    LOAD_CURRENT
} from '../constants'

export const load = () => ({
    type: LOAD_USERS,
    payload: usersApi.loadAll()
})

export const loadCurrent = () => ({
    type: LOAD_CURRENT,
    payload: usersApi.loadCurrent()
})
