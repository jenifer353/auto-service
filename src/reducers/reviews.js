import {
    LOAD_REVIEWS_ABOUT_FULFILLED,
    LOAD_REVIEWS_ABOUT_REJECTED
} from '../constants'
import { NotificationManager } from 'react-notifications'

export const initial = {
    byUser: {}
}

export default (state = initial, action) => {
    switch (action.type) {
        case LOAD_REVIEWS_ABOUT_FULFILLED: {
            const uid = action.payload.config.url.split('/').pop()
            return {
                ...state,
                byUser: {
                    ...state.byUser,
                    [uid]: action.payload.data
                }
            }
        }

        case LOAD_REVIEWS_ABOUT_REJECTED: {
            const error = action.payload.response.data ? action.payload.response.data.error : 'Server error'
            NotificationManager.error(error, 'Не вдалось завантажити відгуки')
        }

        default: {
            return state
        }
    }
}
