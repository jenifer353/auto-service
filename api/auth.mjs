import Users from '../models/users'
import express from 'express'
import passwordHash from 'password-hash'
import jwt from 'jsonwebtoken'
import config from '../config.json'

const router = express.Router()
export default router

const createToken = (id) =>
    jwt.sign({id: id}, config.secret, {expiresIn: 43200000})

router.post('/login/', async (req, res) => {
    const { email, password } = req.body
    const user = await Users.findOne({email})

    if (!user)
        return res.status(400).send({error: 'Такого користувача не знайдено'})

    if (!passwordHash.verify(password, user.password))
        return res.status(400).send({error: 'Невірний пароль'})

    const token = createToken(user._id) // for 5 days
    res.send({token})
})

router.put('/register/', async (req, res) => {
    try {
        const {
            email,
            name,
            password,
            confirmPassword
        } = req.body
        const user = await Users.findOne({email})

        if (user)
            return res.status(400).send({error: 'Користувач з такою електронною адресою вже існує'})

        if (!name)
            return res.status(400).send({error: "Ім'я не може бути пустим"})

        if (password !== confirmPassword)
            return res.status(400).send({error: 'Паролі не співпадають'})

        const newUser = new Users({ name, email, password: passwordHash.generate(password) })
        const saved = await newUser.save()
        res.send({token: createToken(saved._id)})
    } catch(e) {
        console.error(e)
        res.status(500).send({ error: e.toString() })
    }
})
