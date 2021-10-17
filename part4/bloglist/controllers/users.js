import bcrypt from 'bcrypt'
import User from '../models/user.js'
import { Router } from 'express'

const usersRouter = Router()

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({}).populate('blogs', { content: 1, likes: 1 })
    response.json(users)
})

usersRouter.get('/:id', async (request, response, next) => {
    try {
        const user = await User.findById(request.params.id)
        if (user) {
            await user.populate('blogs')
            response.json(user)
        } else {
            response.status(404).end()
        }
    } catch (error) {
        next(error)
    }
})

usersRouter.post('/', async (request, response, next) => {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })
    try {
        const savedUser = await user.save()
        response.json(savedUser)
    } catch (error) {
        next(error)
    }

})

export default usersRouter