import axios from 'axios'

const isLocalhost = false // change this based on environment

const api = axios.create({
    baseURL: isLocalhost
        ? 'http://localhost:5000'
        : 'https://sekure-password-server.vercel.app',
    withCredentials: true
})

export default api