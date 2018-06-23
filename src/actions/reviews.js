import * as reviewsApi from '../api/reviews'
import {
    LOAD_REVIEWS_ABOUT
} from '../constants'

export const loadAbout = (id) => ({
    type: LOAD_REVIEWS_ABOUT,
    payload: reviewsApi.loadAbout(id)
})
