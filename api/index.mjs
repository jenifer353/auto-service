import express from 'express'
import auth from './auth'

const router = express.Router()
export default router

router.use('/auth/', auth)
