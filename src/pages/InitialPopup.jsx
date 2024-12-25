import { Box, Stack, Typography, Button, Input } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

function InitialPopup() {
    const [isSignup, setIsSignup] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const switchMode = () => {
        setIsSignup((prev) => !prev)
    }

    const signup = async (formData, setError) => {
        try {
            const data = await axios.post('http://localhost:5000/user/signup', formData)
            // console.log(JSON.stringify({ ...data }))
            console.log(data)
            navigate('/list')
        } catch (error) {
            setError(error.response.data.message)
            console.log(error)
        }
    }

    const signin = async (formData, setError) => {
        try {
            const data = await axios.post('http://localhost:5000/user/signin', formData)
            // console.log(JSON.stringify({ ...data }))
            console.log(data)
            navigate('/list')
        } catch (error) {
            setError(error.response.data.message)
            console.log(error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isSignup) {
            signup(formData, setError)
        } else {
            signin(formData, setError)
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <Box flex={5} display='flex' justifyContent='center' alignItems='center' padding={10}>
            <Box sx={{ minWidth: { xs: 0, sm: 400 } }}>
                <Typography variant='h5' paddingBottom={3}>{isSignup ? 'Sign up' : 'Sign In'}</Typography>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        {
                            isSignup && (
                                <Stack direction='row' spacing={2}>
                                    <Input variant='outlined' name='firstName' label='First Name' onChange={handleChange} width='50%' autoFocus />
                                    <Input variant='outlined' name='lastName' label='Last Name' onChange={handleChange} width='50%' />
                                </Stack>
                            )
                        }
                        <Input variant='outlined' name='email' label='Email' onChange={handleChange} type='email' />
                        <Input variant='outlined' name='password' label='Password' onChange={handleChange} type='password' />
                        {isSignup && <Input variant='outlined' name='confirmPassword' label='Confirm Password' onChange={handleChange} type='password' />}
                        <Typography variant='h6' color='error'>{error}</Typography>
                        <Button type='submit' fullWidth variant='contained' color='primary'>
                            {isSignup ? 'Sign Up' : 'Sign In'}
                        </Button>
                        <Button onClick={switchMode}>
                            {isSignup ? 'Already have an account? Sign in' : 'Dont have an account? Sign up'}
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Box>
    )
}

export default InitialPopup