import Accounts from '../models/accounts'
import express from 'express'
import passwordHash from 'password-hash'
import jwt from 'jsonwebtoken'
import config from '../config.json'

const router = express.Router()
export default router

export const withAuth = async (req, res, next) => {
    const err = (details = 'No token provided') =>
    res.status(401).send({
        details,
        error: 'Authorization required'
    })
    const token = req.headers.authorization
    if (!token) return err()

    try {
        const data = jwt.verify(token, config.secret)
        req.uid = data.id
        next()
    } catch(e) {
        console.error(e)
        err(e.toString())
    }
}

const createToken = (id) =>
    jwt.sign({id: id}, config.secret, {expiresIn: 43200000})

router.post('/login/', async (req, res) => {
    const { email, password } = req.body
    const account = await Accounts.findOne({email})

    if (!account)
        return res.status(400).send({error: 'Такого користувача не знайдено'})

    if (!passwordHash.verify(password, account.password))
        return res.status(400).send({error: 'Невірний пароль'})

    const token = createToken(account._id) // for 5 days
    res.send({token})
})

router.post('/register/', async (req, res) => {
    try {
        const {
            email,
            address,
            name,
            isService,
            password,
            confirmPassword
        } = req.body
        const account = await Accounts.findOne({email})

        if (account)
            return res.status(400).send({error: 'Така електронною адресою вже існує'})

        if (!name)
            return res.status(400).send({error: "Назва не може бути пустою"})

        if (password !== confirmPassword)
            return res.status(400).send({error: 'Паролі не співпадають'})

        const newAccount = new Accounts({ name, isService, address, email, password: passwordHash.generate(password) })
        const saved = await newAccount.save()
        res.send({token: createToken(saved._id)})
    } catch(e) {
        console.error(e)
        res.status(500).send({ error: e.toString() })
    }
})
