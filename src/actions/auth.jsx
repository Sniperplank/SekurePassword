import axios from 'axios'
import api from '../utils/axios'

axios.defaults.withCredentials = true

export const signin = async (formData, navigate, setError, setUser) => {
    try {
        await api.post('/user/signin', formData, { withCredentials: true })
        const res = await api.get('/user/me', { withCredentials: true })

        const userProfile = res.data.user

        chrome.storage.local.set({ profile: userProfile }, () => {
            if (chrome.runtime.lastError) {
                console.error("Error saving profile:", chrome.runtime.lastError.message)
                setError("Failed to save user data.")
                return
            }

            console.log("User profile saved.")
            setUser(userProfile)
            navigate('/list')
        })
    } catch (error) {
        console.log(error)
        setError(error.response.data.message)
    }
}

export const signup = async (formData, navigate, setError, setUser) => {
    try {
        await api.post('/user/signup', formData, { withCredentials: true })
        const res = await api.get('/user/me', { withCredentials: true })

        const userProfile = res.data.user

        chrome.storage.local.set({ profile: userProfile }, () => {
            if (chrome.runtime.lastError) {
                console.error("Error saving profile:", chrome.runtime.lastError.message)
                setError("Failed to save user data.")
                return
            }

            console.log("User profile saved.")
            setUser(userProfile)
            navigate('/list')
        })
    } catch (error) {
        console.log(error)
        setError(error.response.data.message)
    }
}
