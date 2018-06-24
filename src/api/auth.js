import { postForm as post } from '../helpers/api'

export const login = (data) => post('/auth/login', data)
export const register = (data) => post('/auth/register', data)
