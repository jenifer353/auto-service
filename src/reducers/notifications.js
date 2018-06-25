import { NotificationManager } from 'react-notifications'

export default (state, action) => {
    switch (action.type) {
        case '@@redux-form/STOP_SUBMIT': {
            if (!action.error) return true
            if (action.meta.form === 'loginForm')
                NotificationManager.error(action.payload._error, 'Невдалий вхід')

            if (action.meta.form === 'registrationForm')
                NotificationManager.error(action.payload._error, 'Невдала реєстрація')

            if (action.meta.form === 'profileForm')
                NotificationManager.error(action.payload._error, 'Невдалe збереження')

            if (action.meta.form === 'requestForm')
                NotificationManager.error(action.payload._error, 'Невдалe замовлення')

            break
        }

        default: {}
    }
    return true
}
