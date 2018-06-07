import Api from '../helpers/api'
const api = new Api('auth')

api.post('login')
api.put('register')

export default api.getExports()
