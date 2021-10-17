import { Router } from 'express'
import jwt from 'jsonwebtoken'
import Blog from '../models/blog.js'
import User from '../models/user.js'

const blogsRouter = Router()

blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
        response.json(blogs)
    } catch (error) {
        next(error)
    }
})

blogsRouter.get('/:id', async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)
        if (blog) {
            await blog.populate('user', { username: 1, name: 1 })
            response.json(blog)
        } else {
            response.status(404).end()
        }
    } catch (error) {
        next(error)
    }
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    //auntentificación
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        const user = await User.findById(decodedToken.id)

        const blog = new Blog({
            content: body.content,
            author: body.author,
            url: body.url,
            user: user._id
        })

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.json(savedBlog)
    } catch (error) {
        next(error)
    }

})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } catch (error) {
        next(error)
    }
})

blogsRouter.put("/:id", async (request, response, next) => {
    const id = request.params.id;
    const body = request.body
    console.log(request.body)
    const opts = {
        new: true,
        runValidators: true,
        context: "query",
    };
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(id, body, opts);
        response.status(201).json(updatedBlog)
    } catch (error) {
        next(error)
    }
});


export default blogsRouter