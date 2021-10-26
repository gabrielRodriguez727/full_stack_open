import React, { useState } from 'react'

const BlogForm = ({ handleBlogForm }) => {
    let [author, setAuthor] = useState('')
    let [title, setTitle] = useState('')
    let [url, setUrl] = useState('')

    function handleOnChange(event) {
        if (event.target.id == 'blogAuthor') {
            setAuthor(event.target.value)
        } else if (event.target.id == 'blogTitle') {
            setTitle(event.target.value)
        } else {
            setUrl(event.target.value)
        }
    }

    function handleOnSubmit(event) {
        event.preventDefault()
        let authorTrimed = author.trim()
        let titleTrimed = title.trim()
        let urlTrimed = url.trim()
        if (authorTrimed && titleTrimed && urlTrimed) {
            handleBlogForm({ author: authorTrimed, title: titleTrimed, url: urlTrimed })
        }
    }

    return (<div>
        <form onSubmit={handleOnSubmit}>
            <div>
                Author
                <input id='blogAuthor' type="text" value={author} onChange={handleOnChange} />
            </div>
            <div>
                Title
                <input id='blogTitle' type="text" value={title} onChange={handleOnChange} />
            </div>
            <div>
                Url
                <input id='blogUrl' type="text" value={url} onChange={handleOnChange} />
            </div>
            <button type="submit">create</button>
        </form>
    </div>)
}



export default BlogForm