import { get, post } from '../helpers/api'

export const save = (data) => post('/accounts/', data)
export const loadAll = () => get('/accounts/')
export const loadServices = () => get('/accounts/services')
export const loadCurrent = () => get('/accounts/current')
