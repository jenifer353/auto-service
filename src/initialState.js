import { initial as auth } from './reducers/auth'
import { initial as accounts } from './reducers/accounts'
import { initial as reviews } from './reducers/reviews'

export default () => ({
    accounts,
    reviews,
    auth
})
