import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app.js';
import Blog from '../models/blog.js';
import helper from './test_helpers.js';

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('when there is initiallly some blogs saved', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    //Verifique que la aplicación de la lista de blogs devuelva la cantidad correcta de publicaciones de blog en formato JSON.
    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')

        const contents = response.body.map(r => r.content)

        expect(contents).toContain('Etiam suscipit commodo eros, at semper lacus aliquam dignissim.')
    })
})

describe('viewing a specifin blog', () => {
    test('succeeds with a valid id', async () => {
        const blogsAtStart = await helper.blogsInDb()

        const blogToView = blogsAtStart[0]

        const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

        expect(resultBlog.body).toEqual(processedBlogToView)
    })

    test('fails with statuscode 404 if blog does not exist', async () => {
        const validNonexistingId = await helper.nonExistingId()

        console.log(validNonexistingId)

        await api
            .get(`/api/blogd/${validNonexistingId}`)
            .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
        const invalidId = '5a3d5da59070081a82a3445'

        await api
            .get(`/api/blogs/${invalidId}`)
            .expect(400)
    })

    //Escriba una prueba que verifique que la propiedad de identificador único de las publicaciones del blog se llame id, de manera predeterminada, la base de datos nombra la propiedad _id. 
    test('blog has prop id is defined', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined();
    })

})

describe('addition of a new blog', () => {

    //Escriba una prueba que verifique que al realizar una solicitud HTTP POST a la URL /api/blogs se crea correctamente una nueva publicación de blog. 
    //Como mínimo, verifique que el número total de blogs en el sistema se incremente en uno.
    //También puede verificar que el contenido de la publicación del blog se guarde correctamente en la base de datos.
    test('a valid blog can be added ', async () => {
        const newBlog = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            content: 'async/await simplifies making async calls',
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const contents = blogsAtEnd.map(n => n.content)
        expect(contents).toContain(
            'async/await simplifies making async calls'
        )
    })

    //Escribe una prueba que verifique que si la propiedad likes falta en la solicitud, tendrá el valor 0 por defecto. 
    test('a blog without likes prop can be added ', async () => {
        const newBlog = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            content: 'async/await simplifies making async calls',
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        const addedBlog = blogsAtEnd[blogsAtEnd.length - 1]
        expect(addedBlog.likes).toEqual(0)
    })

    //Escriba una prueba relacionada con la creación de blogs nuevos a través del endpoint /api/blogs,
    // que verifique que si faltan las propiedades title y url de los datos solicitados, el backend responde a la solicitud con el código de estado 400 Bad Request.
    test('fails with status code 400 if data invaild', async () => {
        const newBlog = {
            author: 'Edsger W. Dijkstra',
            content: 'async/await simplifies making async calls',
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    })
})

describe('updating of a blog', () => {

    test('a valid update', async () => {
        const blogsAtStart = await helper.blogsInDb()
        let blogToUpdate = blogsAtStart[0]
        blogToUpdate.content = 'update js - async/await simplifies making async calls'

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
        const contents = blogsAtEnd.map(n => n.content)
        expect(contents).toContain('update js - async/await simplifies making async calls')
    })

    //Escriba una prueba relacionada con la creación de blogs nuevos a través del endpoint /api/blogs,
    // que verifique que si faltan las propiedades title y url de los datos solicitados, el backend responde a la solicitud con el código de estado 400 Bad Request.
    test('a invalid update', async () => {
        const blogsAtStart = await helper.blogsInDb()
        let blogToUpdate = blogsAtStart[0]
        blogToUpdate.content = 'No'

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
        const contents = blogsAtEnd.map(n => n.content)
        expect(contents).not.toContain('No')

    })
})

describe('deletion of a note', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length - 1
        )

        const contents = blogsAtEnd.map(r => r.content)

        expect(contents).not.toContain(blogToDelete.content)
    })
})



afterAll(() => {
    mongoose.connection.close()
})