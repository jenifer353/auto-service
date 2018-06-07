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
    const { username, password } = req.body
    const user = await Users.findOne({username})

    if (!user)
        return res.status(400).send({error: 'Такого користувача не знайдено'})

    if (!passwordHash.verify(password, user.password))
        return res.status(400).send({error: 'Невірний пароль'})

    const token = createToken(user._id) // for 5 days
    res.send({token})
})

router.put('/register/', async (req, res) => {
    const { username, password, confirmPassword} = req.body
    const user = await Users.findOne({username})

    if (user)
        return res.status(400).send({error: 'Користувач з таким іменем уже існує'})

    if (password !== confirmPassword)
        return res.status(400).send({error: 'Паролі не співпадають'})

    const newUser = new Users({ username, password: passwordHash.generate(password) })
    const saved = await newUser.save()
    res.send({token: createToken(saved._id)})
})
