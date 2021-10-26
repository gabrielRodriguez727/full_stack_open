import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null


const config = {
  headers: { Authorization: token },
}


async function create(newBlog) {
  const config = {
    headers: { Authorization: token },
  }
  try {
    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

async function getAll() {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

function setToken(newToken) {
  token = `bearer ${newToken}`
}

async function update(id, newBlog) {
  try {
    const response = await axios.put(`${baseUrl} /${id}`, newBlog, config)
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

export default { getAll, create, update, setToken }
