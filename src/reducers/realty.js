import {
    LOAD_REALTY_PENDING,
    LOAD_REALTY_FULFILLED,
    LOAD_REALTY_REJECTED
} from '../constants'
import { getToken, setToken, unsetToken } from '../helpers/api'
import { NotificationManager } from 'react-notifications'

export const initial = {
    items: [],
    loadingItems: false,
    lastLoaded: 0
}

export default (state = initial, action) => {
    switch (action.type) {
        case LOAD_REALTY_PENDING: {
            return {...state, loadingItems: true}
        }

        case LOAD_REALTY_FULFILLED: {
            return {
                ...state,
                loadingItems: false,
                items: action.payload.data,
                lastLoaded: Date.now()
            }
        }

        case LOAD_REALTY_REJECTED: {
            const error = action.payload.response.data.error
            NotificationManager.error(error, 'Список оголошень не вдалось завантажити')
            return {...state, loadingItems: false }
        }

        default: {
            return state
        }
    }
}
