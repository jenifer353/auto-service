import { initial as auth } from './reducers/auth'
import { initial as accounts } from './reducers/accounts'
import { initial as realty } from './reducers/realty'
import { initial as reviews } from './reducers/reviews'

export default () => ({
    accounts,
    realty,
    reviews,
    auth
})
