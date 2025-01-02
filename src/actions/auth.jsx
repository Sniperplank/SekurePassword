import axios from 'axios'

export const signin = async (formData, navigate, setError) => {
    try {
        const { data } = await axios.post('http://localhost:5000/user/signin', formData)
        // localStorage.setItem('profile', JSON.stringify({ ...data }))
        // navigate('/list')
        chrome.storage.local.set({ profile: { ...data } }).then(() => {
            if (chrome.runtime.lastError) {
                console.error("Error saving profile:", chrome.runtime.lastError.message);
                setError("Failed to save user data.");
                return;
            }

            console.log("User profile saved.");
            navigate('/list')
        })
    } catch (error) {
        console.log(error)
        setError(error.response.data.message)
    }
}

export const signup = async (formData, navigate, setError) => {
    try {
        const { data } = await axios.post('http://localhost:5000/user/signup', formData)
        // localStorage.setItem('profile', JSON.stringify({ ...data }))
        // navigate('/list')
        chrome.storage.local.set({ profile: { ...data } }).then(() => {
            if (chrome.runtime.lastError) {
                console.error("Error saving profile:", chrome.runtime.lastError.message);
                setError("Failed to save user data.");
                return;
            }

            console.log("User profile saved.");
            navigate('/list')
        })

    } catch (error) {
        console.log(error)
        setError(error.response.data.message)
    }
}
