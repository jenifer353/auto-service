import axios from 'axios'
import { loadAll } from '../api/realty'
import { LOAD_REALTY, SAVE_REALTY, REMOVE_REALTY } from '../constants'

export const load = () => ({
    type: LOAD_REALTY,
    payload: loadAll()
})
