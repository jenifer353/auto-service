import {
    LOAD_CURRENT_PENDING,
    LOAD_CURRENT_FULFILLED,
    LOAD_CURRENT_REJECTED,
    LOAD_SERVICES_PENDING,
    LOAD_SERVICES_FULFILLED,
    LOAD_SERVICES_REJECTED
} from '../constants'
import { NotificationManager } from 'react-notifications'

export const initial = {
    byId: {},
    services: [],
    loadingServices: false,
    current: null,
    loadingCurrent: false
}

const addById = (state, items) => {
    const obj = {}
    items.forEach(i => obj[i._id] = i)
    return {...state.byId, ...obj}
}

export default (state = initial, action) => {
    switch (action.type) {
        case LOAD_CURRENT_PENDING: {
            return {...state, loadingCurrent: true}
        }

        case LOAD_CURRENT_FULFILLED: {
            const item = action.payload.data
            return {
                ...state,
                byId: addById(state, [item]),
                loadingCurrent: false,
                current: item
            }
        }

        case LOAD_CURRENT_REJECTED: {
            const error = action.payload.data ? action.payload.data.error : 'Server error'
            NotificationManager.error(error, 'Поточного користувача не вдалось завантажити')
            return {...state, loadingCurrent: false }
        }

        case LOAD_SERVICES_PENDING: {
            return {...state, loadingServices: true}
        }

        case LOAD_SERVICES_FULFILLED: {
            const items = action.payload.data
            return {
                ...state,
                byId: addById(state, items),
                loadingServices: false,
                services: items
            }
        }

        case LOAD_SERVICES_REJECTED: {
            const error = action.payload.data ? action.payload.data.error : 'Server error'
            NotificationManager.error(error, 'Список сервісів не вдалось завантажити')
            return {...state, loadingServices: false }
        }

        default: {
            return state
        }
    }
}
