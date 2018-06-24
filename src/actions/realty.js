import * as realtyApi from '../api/realty'
import { LOAD_REALTY, LOAD_REALTY_ITEM, LOAD_OWN_REALTY, REMOVE_REALTY } from '../constants'

export const load = () => ({
    type: LOAD_REALTY,
    payload: realtyApi.loadAll()
})

export const loadItem = (id) => ({
    type: LOAD_REALTY_ITEM,
    payload: realtyApi.loadItem(id)
})

export const loadOwn = () => ({
    type: LOAD_OWN_REALTY,
    payload: realtyApi.loadOwn()
})

export const removeItem = (id) => ({
    type: REMOVE_REALTY,
    payload: realtyApi.removeItem(id)
})
