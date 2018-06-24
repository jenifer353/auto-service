import { initial as auth } from './reducers/auth'
import { initial as users } from './reducers/users'
import { initial as realty } from './reducers/realty'
import { initial as reviews } from './reducers/reviews'

export default () => ({
    users,
    realty,
    reviews,
    auth
})
