import { Router } from 'express'
import Blog from '../models/blog.js'
const blogsRouter = Router()


blogsRouter.get('/', async (request, response) => {
    try {
        const blogs = await Blog.find({})
        response.json(blogs)
    } catch (error) {
        next(error)
    }
})

blogsRouter.get('/:id', async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)
        if (blog) {
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
    const blog = new Blog({
        content: body.content,
        author: body.author,
        url: body.url
    })
    try {
        const savedBlog = await blog.save()
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