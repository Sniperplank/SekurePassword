import axios from 'axios'

axios.defaults.withCredentials = true

export const signin = async (formData, navigate, setError) => {
    try {
        await axios.post('https://sekure-password-server.vercel.app/user/signin', formData, { withCredentials: true })
        navigate('/list')
    } catch (error) {
        console.log(error)
        setError(error.response.data.message)
    }
}

export const signup = async (formData, navigate, setError) => {
    try {
        await axios.post('https://sekure-password-server.vercel.app/user/signup', formData, { withCredentials: true })
        navigate('/list')
    } catch (error) {
        console.log(error)
        setError(error.response.data.message)
    }
}
