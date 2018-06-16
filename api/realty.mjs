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
    } else item = new Realty({ image, name, description })

    const saved = await item.save()
    res.send(saved)
})

router.get('/', async (req, res) => {
    const items = await Realty.find()
    res.send(items)
})
