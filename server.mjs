import mongoose from 'mongoose'
import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import config from './config.json'
import api from './api'

mongoose.Promise = Promise
const __dirname = path.dirname(new URL(import.meta.url).pathname)
const port = config.port || 4243

mongoose
    .connect(config.mongo || 'mongodb://localhost/realty-agency')
    .catch((e) => {
        console.error('Connection error', e)
        process.exit(0)
    })

const app = express()

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'build')))
app.use('/api/', api)

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'build/index.html')))

app.listen(port, () => console.log(`Started on port ${port}`))
