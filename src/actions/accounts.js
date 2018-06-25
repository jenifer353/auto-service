import * as accountsApi from '../api/accounts'
import {
    LOAD_SERVICES,
    LOAD_ACCOUNT,
    LOAD_CURRENT
} from '../constants'

export const load = (id) => ({
    type: LOAD_ACCOUNT,
    payload: accountsApi.load(id)
})

export const loadServices = () => ({
    type: LOAD_SERVICES,
    payload: accountsApi.loadServices()
})

export const loadCurrent = () => ({
    type: LOAD_CURRENT,
    payload: accountsApi.loadCurrent()
})
