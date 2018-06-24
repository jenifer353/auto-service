import axios from 'axios'
import { SubmissionError } from 'redux-form'

export const getToken = () =>
    sessionStorage.getItem('authToken')

export const setToken = (token) =>
    sessionStorage.setItem('authToken', token)

export const unsetToken = () =>
    sessionStorage.removeItem('authToken')

const handler = (method, subroute, data) => {
    const url = `/api${subroute}`
    return axios({method, url, data, headers: {Authorization: getToken()}})
}

const formHandler = (method, subroute, data) =>
    handler(method, subroute, data).catch(err => {
        const message = err.response && err.response.data.error
        throw new SubmissionError({_error: message || err.toString()})
    })

export const postForm = (subroute, data) =>
    formHandler('post', subroute, data)

export const get = (subroute, data) =>
    handler('get', subroute, data)

export const post = (subroute, data) =>
    handler('post', subroute, data)
