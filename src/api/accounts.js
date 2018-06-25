import { get, postForm } from '../helpers/api'

export const save = (data) => postForm('/accounts/', data)
export const load = (id) => get(`/accounts/${id}`)
export const loadServices = () => get('/accounts/services')
export const loadCurrent = () => get('/accounts/current')
