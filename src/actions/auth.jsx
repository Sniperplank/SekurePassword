import axios from 'axios'

axios.defaults.withCredentials = true

export const signin = async (formData, navigate, setError, setUser) => {
    try {
        await axios.post('https://sekure-password-server.vercel.app/user/signin', formData, { withCredentials: true })
        const res = await axios.get('https://sekure-password-server.vercel.app/user/me', { withCredentials: true })

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
        await axios.post('https://sekure-password-server.vercel.app/user/signup', formData, { withCredentials: true })
        const res = await axios.get('https://sekure-password-server.vercel.app/user/me', { withCredentials: true })

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
