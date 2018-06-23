import { get } from '../helpers/api'

export const loadAll = () => get('/realty/')
export const loadOwn = () => get('/realty/own')
