import Blog from '../models/blog.js'

const initialBlogs = [
    { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', content: 'Maecenas aliquam ut neque quis venenatis. Nulla nibh mi, lobortis et commodo sed, sollicitudin et odio.', likes: 7, __v: 0 },
    { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', content: 'Ut et pretium neque, mollis ultrices erat. Quisque eget mi faucibus, lobortis odio sed, iaculis diam. ', likes: 5, __v: 0 },
    { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', content: 'Proin eu lacinia dolor, condimentum tempor mauris. Quisque maximus dui ex, vel convallis sem.', likes: 12, __v: 0 },
    { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', content: 'Sed fermentum turpis elit, nec ultrices quam cursus blandit. Donec a tincidunt lorem.', likes: 10, __v: 0 },
    { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', content: 'Proin pellentesque diam nec dui suscipit dignissim. Nulla mattis, sapien eu ultrices suscipit, ex est cursus ligula, nec pharetra est turpis at ipsum.', likes: 0, __v: 0 },
    { _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', content: 'Etiam suscipit commodo eros, at semper lacus aliquam dignissim.', likes: 2, __v: 0 }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'for remove', content: 'willremovethissoon very soon very soon very soon', author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html" })
    await blog.save()
    await blog.remove()
    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

export default { initialBlogs, nonExistingId, blogsInDb }