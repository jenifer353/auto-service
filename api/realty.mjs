import Realty from '../models/realty'
import express from 'express'

const router = express.Router()
export default router

router.post('/', async (req, res) => {
    const { images, name, description, _id } = req.body
    let item

    if (!name || !description) {
        const nudes = { error: 'Wronk data' }
        res.status(400).send(nudes)
        return
    }

    if (_id) {
        item = await Realty.findOne({_id})
        if (item.user.toString() !== req.uid.toString()) {
            res.status(401).send({ error: "Access error" })
            return
        }
        item.name = name
        item.images = images
        item.description = description
    } else item = new Realty({ images, name, description, user: req.uid })

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

router.get('/:id', async (req, res) => {
    const item = await Realty.findOne({ _id: req.params.id })
    res.send(item)
})

router.delete('/:id', async (req, res) => {
    try {
        const removed = await Realty.remove({ _id: req.params.id, user: req.uid })
        res.send({...removed, _id: req.params.id })
    } catch(e) {
        console.error(e)
        res.status(500).send({ error: e.toString() })
    }
})
