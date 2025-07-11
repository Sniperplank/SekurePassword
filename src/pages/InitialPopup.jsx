import { Box, Stack, Typography, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CardBox } from '../StyledComponents/CardBox'
import { StyledButton } from '../StyledComponents/StyledButton'
import { StyledInput } from '../StyledComponents/StyledInput'
import { signin, signup } from '../actions/auth'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'
import api from '../utils/axios'

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

function InitialPopup() {
    const { user, setUser } = useAuth()
    const [isSignup, setIsSignup] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const [isHidden, setIsHidden] = useState(true)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const changeHiddenMode = () => {
        setIsHidden(prev => !prev)
    }

    const checkIfUserLoggedIn = async () => {
        try {
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
        } catch (err) {
            console.log('User not logged in:', err.response?.data?.message || err.message)
        }
    }

    // Check for existing user
    useEffect(() => {
        chrome.storage.local.get('profile', (result) => {
            if (result.profile) {
                console.log('User already logged in:', result.profile)
                setUser(result.profile)
                navigate('/list')
            } else {
                checkIfUserLoggedIn()
            }
        })

    }, [navigate])

    const switchMode = () => {
        setIsSignup((prev) => !prev)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isSignup) {
            signup(formData, navigate, setError, setUser)
        } else {
            signin(formData, navigate, setError, setUser)
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const forgotPassword = () => {
        navigate('/forgot-password')
    }

    return (
        <Stack spacing={3}>
            <Typography variant='h4' color='primary'>Sekure Password</Typography>
            <CardBox sx={{ padding: '1rem', margin: 0 }}>
                <Typography variant='h5' paddingBottom={3}>{isSignup ? 'Sign up' : 'Sign In'}</Typography>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        {
                            isSignup && (
                                <Stack direction='row' spacing={2}>
                                    <StyledInput variant='outlined' name='firstName' label='First Name' onChange={handleChange} width='50%' autoFocus />
                                    <StyledInput variant='outlined' name='lastName' label='Last Name' onChange={handleChange} width='50%' />
                                </Stack>
                            )
                        }
                        <StyledInput variant='outlined' name='email' label='Email' onChange={handleChange} type='email' />
                        <Stack direction='row' spacing={1}>
                            <StyledInput sx={{ width: '90%' }} variant='outlined' name='password' label='Main Password' onChange={handleChange} type={isHidden ? 'password' : 'text'} />
                            {isHidden ? <VisibilityOffIcon onClick={changeHiddenMode} color='primary' sx={{ alignSelf: 'center', cursor: 'pointer' }} /> : <VisibilityIcon onClick={changeHiddenMode} color='primary' sx={{ alignSelf: 'center', cursor: 'pointer' }} />}
                        </Stack>
                        {isSignup && <StyledInput variant='outlined' name='confirmPassword' label='Confirm Main Password' onChange={handleChange} type={isHidden ? 'password' : 'text'} />}
                        {error !== '' && <Typography variant='h6' color='error'>{error}</Typography>}
                        <StyledButton type='submit' fullWidth variant='contained' color='primary'>
                            {isSignup ? 'Sign Up' : 'Sign In'}
                        </StyledButton>
                        <Button sx={{ textTransform: 'none' }} onClick={switchMode}>
                            {isSignup ? 'Already have an account? Sign in' : 'Dont have an account? Sign up'}
                        </Button>
                        {
                            !isSignup &&
                            <Button sx={{ textTransform: 'none' }} onClick={forgotPassword}>Forgot Password</Button>
                        }
                    </Stack>
                </form>
            </CardBox>
        </Stack>
    )
}

export default InitialPopup