import * as accountsApi from '../api/accounts'
import {
    LOAD_SERVICES,
    LOAD_ACCOUNTS,
    SAVE_ACCOUNT,
    LOAD_CURRENT
} from '../constants'

export const load = () => ({
    type: LOAD_ACCOUNTS,
    payload: accountsApi.loadAll()
})

export const save = (data) => ({
    type: SAVE_ACCOUNT,
    payload: accountsApi.save(data)
})

export const loadServices = () => ({
    type: LOAD_SERVICES,
    payload: accountsApi.loadServices()
})

export const loadCurrent = () => ({
    type: LOAD_CURRENT,
    payload: accountsApi.loadCurrent()
})
