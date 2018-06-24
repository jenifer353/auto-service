import { get, post, remove, postForm } from '../helpers/api'

export const loadAll = () => get('/realty/')
export const loadItem = (id) => get(`/realty/${id}`)
export const loadOwn = () => get('/realty/own')
export const loadBooked = () => get('/realty/booked')
export const save = (item) => post('/realty/', item)
export const removeItem = (id) => remove(`/realty/${id}`)
export const bookItem = (data) => postForm('/realty/book', data)
