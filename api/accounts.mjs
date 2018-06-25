import Accounts from '../models/accounts'
import express from 'express'

const router = express.Router()
export default router

router.get('/current', async (req, res) => {
    const account = await Accounts.findOne({ _id: req.uid })
    res.send(account)
})

router.get('/services', async (req, res) => {
    const services = await Accounts.find({ isService: true })
    res.send(services)
})

router.post('/', async (req, res) => {
    const { images, name, address, email, _id } = req.body
    if (!name || !email || !_id) {
        res.status(400).send({ error: 'Wrong data' })
        return
    }

    const item = await Accounts.findOne({ _id })
    item.images = images
    item.name = name
    item.address = address
    item.email = email
    const saved = await item.save()
    res.send(saved)
})

router.get('/', async (req, res) => {
    const items = await Accounts.find()
    res.send(items)
})
