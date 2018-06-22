import { get } from '../helpers/api'

export const loadAll = () => get('/users/')
export const loadCurrent = () => get('/users/current')
