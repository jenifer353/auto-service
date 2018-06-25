import { postForm } from '../helpers/api'

export const save = (data) => postForm('/requests/', data)
