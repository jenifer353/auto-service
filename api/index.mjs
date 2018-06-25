import express from 'express'
import auth, { withAuth } from './auth'
import accounts from './accounts'
import requests from './requests'
import reviews from './reviews'

const router = express.Router()
export default router

router.use('/auth/', auth)
router.use('/requests/', withAuth, requests)
router.use('/accounts/', withAuth, accounts)
router.use('/reviews/', withAuth, reviews)

router.get('/*', (req, res) =>
    res.status(404).send({ error: 'Api method not found' }))
