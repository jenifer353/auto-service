import Reviews from '../models/reviews'
import express from 'express'

const router = express.Router()
export default router

router.get('/:id', async (req, res) => {
    const reviews = await Reviews.find({ forUser: req.params.id })
    res.send(reviews)
})
