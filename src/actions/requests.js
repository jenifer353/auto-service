import * as requestsApi from '../api/requests'
import { LOAD_OWN_REQUESTS } from '../constants'

export const loadOwn = () => ({
    type: LOAD_OWN_REQUESTS,
    payload: requestsApi.loadOwn()
})
