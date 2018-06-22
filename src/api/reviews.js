import { get } from '../helpers/api'

export const loadAbout = (id) => get(`/reviews/${id}`)
