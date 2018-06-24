import * as accountsApi from '../api/accounts'
import {
    LOAD_ACCOUNTS,
    LOAD_CURRENT
} from '../constants'

export const load = () => ({
    type: LOAD_ACCOUNTS,
    payload: accountsApi.loadAll()
})

export const loadCurrent = () => ({
    type: LOAD_CURRENT,
    payload: accountsApi.loadCurrent()
})
