import { Router } from 'express'
import Blog from '../models/blog.js'
const blogsRouter = Router()


blogsRouter.get('/', (request, response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs)
    })
})

blogsRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
        .then(blog => {
            if (blog) {
                response.json(blog)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

blogsRouter.post('/', (request, response, next) => {
    const body = request.body

    const blog = new Blog({
        content: body.content,
        author: body.author,
        url: body.url
    })

    blog.save()
        .then(savedBlog => {
            response.json(savedBlog)
        })
        .catch(error => next(error))
})

blogsRouter.delete('/:id', (request, response, next) => {
    Blog.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

blogsRouter.put("/:id", (request, response, next) => {
    const id = request.params.id;
    const body = request.body
    console.log(request.body)
    const opts = {
        new: true,
        runValidators: true,
        context: "query",
    };
    Blog.findByIdAndUpdate(id, body, opts)
        .then((result) => {
            response.status(201).json(result);
        })
        .catch((error) => next(error));
});


export default blogsRouter