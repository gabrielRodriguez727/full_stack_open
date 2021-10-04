import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minlength: 10
    },
    author: {
        type: String,
        required: true,
        minlength: 3
    },
    url: {
        type: String,
        required: true,
        minlength: 5
    },
    likes: {
        type: Number,
        default: 0
    },
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Blog = mongoose.model('Blog', blogSchema)

export default Blog