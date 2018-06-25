import { get, postForm } from '../helpers/api'

export const save = (data) => postForm('/requests/', data)
export const loadOwn = () => get('/requests/own')
