import {
    LOAD_REALTY_PENDING,
    LOAD_REALTY_FULFILLED,
    LOAD_REALTY_REJECTED,
    LOAD_OWN_REALTY_PENDING,
    LOAD_OWN_REALTY_FULFILLED,
    LOAD_OWN_REALTY_REJECTED
} from '../constants'
import { NotificationManager } from 'react-notifications'

export const initial = {
    items: [],
    ownItems: [],
    loadingItems: false,
    loadingOwn: false,
    lastLoaded: 0,
    lastLoadedOwn: 0
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
            const error = action.payload.response.data ? action.payload.response.data.error : 'Server error'
            NotificationManager.error(error, 'Список оголошень не вдалось завантажити')
            return {...state, loadingItems: false }
        }

        case LOAD_OWN_REALTY_PENDING: {
            return {...state, loadingOwn: true}
        }

        case LOAD_OWN_REALTY_FULFILLED: {
            return {
                ...state,
                loadingOwn: false,
                ownItems: action.payload.data,
                lastLoadedOwn: Date.now()
            }
        }

        case LOAD_OWN_REALTY_REJECTED: {
            const error = action.payload.response.data ? action.payload.response.data.error : 'Server error'
            NotificationManager.error(error, 'Список своїх оголошень не вдалось завантажити')
            return {...state, loadingOwn: false }
        }

        default: {
            return state
        }
    }
}
