import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    // const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const [user, setUser] = useState(null)

    useEffect(() => {
        chrome.storage.local.get("profile", (result) => {
            if (chrome.runtime.lastError) {
                console.error('Failed to fetch profile:', chrome.runtime.lastError.message)
            } else {
                setUser(result.profile || null)
            }
        })
    }, [])

    const value = {
        user,
        setUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
