import {
    LOAD_CURRENT_PENDING,
    LOAD_CURRENT_FULFILLED,
    LOAD_CURRENT_REJECTED
} from '../constants'
import { NotificationManager } from 'react-notifications'

export const initial = {
    current: null,
    loadingCurrent: false
}

export default (state = initial, action) => {
    switch (action.type) {
        case LOAD_CURRENT_PENDING: {
            return {...state, loadingCurrent: true}
        }

        case LOAD_CURRENT_FULFILLED: {
            return {
                ...state,
                loadingCurrent: false,
                current: action.payload.data
            }
        }

        case LOAD_CURRENT_REJECTED: {
            const error = action.payload.response.data ? action.payload.response.data.error : 'Server error'
            NotificationManager.error(error, 'Поточного користувача не вдалось завантажити')
            return {...state, loadingCurrent: false }
        }

        default: {
            return state
        }
    }
}
