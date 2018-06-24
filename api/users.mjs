import Users from '../models/users'
import express from 'express'

const router = express.Router()
export default router

router.get('/current', async (req, res) => {
    const user = await Users.findOne({ _id: req.uid })
    res.send(user)
})

router.get('/', async (req, res) => {
    const items = await Users.find()
    res.send(items)
})
