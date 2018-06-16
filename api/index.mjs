import express from 'express'
import auth from './auth'
import realty from './realty'

const router = express.Router()
export default router

router.use('/auth/', auth)
router.use('/realty/', realty)

router.get('/*', (req, res) =>
    res.status(404).send({ error: 'Api method not found' }))
