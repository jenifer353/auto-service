import Realty from '../models/realty'
import express from 'express'

const router = express.Router()
export default router

router.post('/', async (req, res) => {
    const { image, name, description, _id } = req.body
    let item

    if (!name || !description) {
        const nudes = { error: 'Wronk data' }
        res.status(400).send(nudes)
        return
    }

    if (_id) {
        item = await Realty.findOne({_id})
        item.name = name
        item.image = image
        item.description = description
    } else item = new Realty({ image, name, description, user: req.uid })

    const saved = await item.save()
    res.send(saved)
})

router.post('/book', async (req, res) => {
    try {
        const { user, realty, bookedTime } = req.body
        const item = await Realty.findOne({ _id: realty })
        item.booked = user
        item.bookedTime = bookedTime
        const saved = await item.save()
        res.send(saved)
    } catch(e) {
        console.error(e)
        res.status(400).send({ error: e.toString() })
    }
})

router.get('/', async (req, res) => {
    const items = await Realty.find()
    res.send(items)
})

router.get('/own', async (req, res) => {
    const items = await Realty.find({ user: req.uid })
    res.send(items)
})
