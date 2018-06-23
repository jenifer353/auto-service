import axios from 'axios'
import { loadAll, loadOwn as own } from '../api/realty'
import { LOAD_REALTY, LOAD_OWN_REALTY } from '../constants'

export const load = () => ({
    type: LOAD_REALTY,
    payload: loadAll()
})

export const loadOwn = () => ({
    type: LOAD_OWN_REALTY,
    payload: own()
})
