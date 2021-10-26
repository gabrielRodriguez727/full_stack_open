import React, { useState, useEffect, useReducer } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({})
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    if (notification.message) {
      setTimeout(function () {
        setNotification({})
      }, 3000)
    }
  }, [notification])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  async function handleBlogForm({ author, title, url }) {
    try {
      const newBlog = await blogService.create({ author, title, url })
      setNotification({ message: 'Blog added' })
      setBlogs([...blogs, newBlog])

    } catch (error) {
      setNotification({ message: error.message })

    }
  }


  function handleOnClickLogout() {
    window.localStorage.removeItem('loggedBloglistAppUser')
    blogService.setToken(null)
    setUser(null)
  }

  async function handleLoginForm({ username, password }) {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBloglistAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (error) {
      setNotification({ message: error.message })
    }
  }


  if (!user)
    return (
      <div>
        <h2>Log in to application</h2>
        <LoginForm handleLoginForm={handleLoginForm} />
        <Notification {...notification} />
      </div>
    )

  return (
    <div>
      <h1>blogs</h1>
      <span>{user.username} is logged</span><button type='button' onClick={handleOnClickLogout}>logout</button>
      <BlogForm handleBlogForm={handleBlogForm} />
      <Notification {...notification} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App