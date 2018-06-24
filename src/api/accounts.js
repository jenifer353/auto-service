import { get } from '../helpers/api'

export const loadAll = () => get('/accounts/')
export const loadServices = () => get('/accounts/services')
export const loadCurrent = () => get('/accounts/current')
