import listHelper from '../utils/list_helpers.js';
/**
 * @jest-environment ./tests/list_helpers
 */
const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        content: 'Aliquam scelerisque, nisi nec placerat semper, dui metus convallis metus, semper dignissim neque dolor eget tortor. ',
        __v: 0
    }
]

const blogs = [
    { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', content: 'Maecenas aliquam ut neque quis venenatis. Nulla nibh mi, lobortis et commodo sed, sollicitudin et odio.', likes: 7, __v: 0 },
    { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', content: 'Ut et pretium neque, mollis ultrices erat. Quisque eget mi faucibus, lobortis odio sed, iaculis diam. ', likes: 5, __v: 0 },
    { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', content: 'Proin eu lacinia dolor, condimentum tempor mauris. Quisque maximus dui ex, vel convallis sem.', likes: 12, __v: 0 },
    { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', content: 'Sed fermentum turpis elit, nec ultrices quam cursus blandit. Donec a tincidunt lorem.', likes: 10, __v: 0 },
    { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', content: 'Proin pellentesque diam nec dui suscipit dignissim. Nulla mattis, sapien eu ultrices suscipit, ex est cursus ligula, nec pharetra est turpis at ipsum.', likes: 0, __v: 0 },
    { _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', content: 'Etiam suscipit commodo eros, at semper lacus aliquam dignissim. ', likes: 2, __v: 0 }
]

test('dummy returns one', () => {
    const blogs = [];
    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
});

describe('total likes', () => {

    test('of empty list is equal zero', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })
})

describe('favorite Blog', () => {

    test('of empty list is equal null', () => {
        const result = listHelper.favoriteBlog([])
        expect(result).toBe(null)
    })

    test('when list has only one blog, equals that blog', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual({
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
        })
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual({
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12
        })
    })
})

describe('author whit most blogs', () => {

    test('of empty list is equal null', () => {
        const result = listHelper.mostBlogs([])
        expect(result).toBe(null)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual({
            author: 'Robert C. Martin',
            blogs: 3
        })
    })
})


describe('author whit most likes', () => {

    test('of empty list is equal null', () => {
        const result = listHelper.mostLikes([])
        expect(result).toBe(null)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 17
        })
    })
})

