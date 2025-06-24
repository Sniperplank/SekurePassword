import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('https://sekure-password-server.vercel.app/user/me', { withCredentials: true })
                setUser(res.data.user)
            } catch (err) {
                console.warn('User not authenticated:', err)
                setUser(null)
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [])

    const value = {
        user,
        setUser,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
