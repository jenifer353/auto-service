import Requests from '../models/requests'
import Accounts from '../models/accounts'
import express from 'express'
import moment from 'moment'

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

router.delete('/:id', async (req, res) => {
    try {
        const removed = await Requests.remove({ _id: req.params.id, account: req.uid })
        res.send({...removed, _id: req.params.id })
    } catch(e) {
        console.error(e)
        res.status(500).send({ error: e.toString() })
    }
})
