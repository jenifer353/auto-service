import Accounts from '../models/accounts'
import express from 'express'

const router = express.Router()
export default router

router.get('/current', async (req, res) => {
    const account = await Accounts.findOne({ _id: req.uid })
    console.log(account)
    res.send(account)
})

router.get('/', async (req, res) => {
    const items = await Accounts.find()
    res.send(items)
})
