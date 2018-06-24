import * as accountsApi from '../api/accounts'
import {
    LOAD_SERVICES,
    LOAD_ACCOUNTS,
    LOAD_CURRENT
} from '../constants'

export const load = () => ({
    type: LOAD_ACCOUNTS,
    payload: accountsApi.loadAll()
})

export const loadServices = () => ({
    type: LOAD_SERVICES,
    payload: accountsApi.loadServices()
})

export const loadCurrent = () => ({
    type: LOAD_CURRENT,
    payload: accountsApi.loadCurrent()
})
