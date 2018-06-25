import Requests from '../models/requests'
import Accounts from '../models/accounts'
import express from 'express'
import moment from 'moment'
import _ from 'lodash'

const router = express.Router()
export default router

router.post('/', async (req, res) => {
    const { description, service, price } = req.body

    if (!service || !description) {
        const nudes = { error: 'Wronk data' }
        res.status(400).send(nudes)
        return
    }

    const item = new Requests({ description, price, service, user: req.uid })
    const saved = await item.save()
    res.send(saved)
})

router.get('/own', async (req, res) => {
    const items = await Requests.find({$or: [
        {service: req.uid},
        {user: req.uid}
    ]})
    const uids = _.flatten(items.map(i => [i.service, i.user]))
    const users = await Accounts.find({ _id: {$in: uids}})
    const byId = {}
    users.forEach(u => byId[u._id] = u)
    const formated = items.map(i => {
        const item = i.toObject({ getters: true })
        item.userItem = byId[item.user]
        item.serviceItem = byId[item.service]
        return item
    })
    res.send(formated)
})

router.delete('/:id', async (req, res) => {
    try {
        const removed = await Requests.remove({ _id: req.params.id, account: req.uid })
        res.send({...removed, _id: req.params.id })
    } catch(e) {
        console.error(e)
        res.status(500).send({ error: e.toString() })
    }
})
