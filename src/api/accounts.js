import { get } from '../helpers/api'

export const loadAll = () => get('/accounts/')
export const loadCurrent = () => get('/accounts/current')
