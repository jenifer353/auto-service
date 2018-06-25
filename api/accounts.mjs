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
    try {
        const { images, name, works, address, email, _id } = req.body
        if (!name || !email || !_id) {
            res.status(400).send({ error: 'Wrong data' })
            return
        }

        const item = await Accounts.findOne({ _id })
        item.images = images
        item.name = name
        item.address = address
        item.email = email
        item.works = works
        const saved = await item.save()
        res.send(saved)
    } catch(e) {
        console.error(e)
        res.status(400).send({ error: e.toString() })
    }
})

router.get('/', async (req, res) => {
    const items = await Accounts.find()
    res.send(items)
})
