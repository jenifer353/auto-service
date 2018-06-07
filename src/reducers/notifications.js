import { NotificationManager } from 'react-notifications'

export default (state, action) => {
    switch (action.type) {
        case '@@redux-form/STOP_SUBMIT': {
            if (!action.error) return true
            if (action.meta.form === 'loginForm')
                NotificationManager.error(action.payload._error, 'Невдалий вхід')

            if (action.meta.form === 'registrationForm')
                NotificationManager.error(action.payload._error, 'Невдала реєстрація')
            break
        }

        default: {}
    }
    return true
}
