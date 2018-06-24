import Realty from '../models/realty'
import Users from '../models/users'
import express from 'express'
import moment from 'moment'

const router = express.Router()
export default router

const format = async (items) => {
    const uids = items.map(i => i.user)
    const users = await Users.find({ _id: { $in: uids } })
    const byId = {}
    users.forEach(u => byId[u._id] = u)
    return items.map(item => {
        const { name: userName, email: userEmail } = byId[item.user]
        return Object.assign({userName, userEmail}, item.toObject({ getters: true }))
    })
}

router.post('/', async (req, res) => {
    const { images, name, rate, description, _id } = req.body
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
        item.rate = rate
        item.images = images
        item.description = description
    } else item = new Realty({ images, name, rate, description, user: req.uid })

    const saved = await item.save()
    res.send(saved)
})

router.post('/book', async (req, res) => {
    const toTime = (t) => Math.floor(moment(t)/1000)
    try {
        const { realty, bookedFrom, bookedTo } = req.body
        const item = await Realty.findOne({ _id: realty })
        item.booked = req.uid
        item.bookedTime = [toTime(bookedFrom), moment(bookedTo)/1000]
        const saved = await item.save()
        res.send(saved)
    } catch(e) {
        console.error(e)
        res.status(400).send({ error: e.toString() })
    }
})

router.get('/', async (req, res) => {
    const items = await Realty.find({ booked: null })
    const formated = await format(items)
    res.send(formated)
})

router.get('/own', async (req, res) => {
    const items = await Realty.find({ user: req.uid })
    const formated = await format(items)
    res.send(formated)
})

router.get('/booked', async (req, res) => {
    const items = await Realty.find({ booked: req.uid })
    const formated = await format(items)
    res.send(formated)
})

router.get('/:id', async (req, res) => {
    const item = await Realty.findOne({ _id: req.params.id })
    const [fItem] = await format([item])
    res.send(fItem)
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
