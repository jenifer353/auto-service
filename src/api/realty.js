import { get, post } from '../helpers/api'

export const loadAll = () => get('/realty/')
export const loadItem = (id) => get(`/realty/${id}`)
export const loadOwn = () => get('/realty/own')
export const save = (item) => post('/realty/', item)
