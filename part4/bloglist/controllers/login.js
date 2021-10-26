import { Router } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const loginRouter = Router()

loginRouter.post('/', async (request, response, next) => {
    console.log(1)
    const body = request.body
    const user = await User.findOne({ username: body.username })
    console.log(2)
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)
    console.log(3)
    if (user && passwordCorrect) {
        console.log(4)
        const userForToken = {
            username: user.username,
            id: user._id,
        }
        const token = jwt.sign(userForToken, process.env.SECRET)
        response
            .status(200)
            .json({ token, username: user.username, name: user.name })
    } else {
        console.log(4)
        next({
            name: 'ValidationError',
            message: 'Invalid username or password'
        })
    }
})

export default loginRouter