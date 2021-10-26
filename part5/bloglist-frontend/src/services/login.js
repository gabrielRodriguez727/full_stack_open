import axios from 'axios'
const baseUrl = '/api/login'

async function login (credentials) {
    try {
        const response = await axios.post(baseUrl, JSON.stringify(credentials), { headers: { 'Content-Type': 'application/json' } })
        return response.data
    } catch (error) {
        throw error.response.data
    }
}

export default { login }
