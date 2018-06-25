import {
    LOAD_OWN_REQUESTS_PENDING,
    LOAD_OWN_REQUESTS_FULFILLED,
    LOAD_OWN_REQUESTS_REJECTED,
} from '../constants'
import { NotificationManager } from 'react-notifications'

export const initial = {
    loading: false,
    items: []
}

export default (state = initial, action) => {
    switch (action.type) {
        case LOAD_OWN_REQUESTS_PENDING: {
            return {...state, loading: true}
        }

        case LOAD_OWN_REQUESTS_FULFILLED: {
            return {
                ...state,
                loading: false,
                items: action.payload.data
            }
        }

        case LOAD_OWN_REQUESTS_REJECTED: {
            const error = action.payload.data ? action.payload.data.error : 'Server error'
            NotificationManager.error(error, 'Список заявок не вдалось завантажити')
            return {...state, loading: false }
        }

        default: {
            return state
        }
    }
}
