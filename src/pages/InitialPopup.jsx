import { Box, Stack, Typography, Button } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CardBox } from '../StyledComponents/CardBox'
import { StyledButton } from '../StyledComponents/StyledButton'
import { StyledInput } from '../StyledComponents/StyledInput'

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

function InitialPopup() {
    const [isSignup, setIsSignup] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const switchMode = () => {
        setIsSignup((prev) => !prev)
    }

    const handleAuth = async (formData, isSignup) => {
        try {
            const endpoint = isSignup ? '/user/signup' : '/user/signin'
            const response = await axios.post(`http://localhost:5000${endpoint}`, formData)

            navigate('/list', { state: { user: response.data } })
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred')
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        handleAuth(formData, isSignup)
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <Box flex={5} display='flex' justifyContent='center' alignItems='center'>
            <CardBox sx={{ minWidth: { xs: 0, sm: 400 } }}>
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
                        <StyledInput variant='outlined' name='password' label='Main Password' onChange={handleChange} type='password' />
                        {isSignup && <StyledInput variant='outlined' name='confirmPassword' label='Confirm Main Password' onChange={handleChange} type='password' />}
                        <Typography variant='h6' color='error'>{error}</Typography>
                        <StyledButton type='submit' fullWidth variant='contained' color='primary'>
                            {isSignup ? 'Sign Up' : 'Sign In'}
                        </StyledButton>
                        <Button onClick={switchMode}>
                            {isSignup ? 'Already have an account? Sign in' : 'Dont have an account? Sign up'}
                        </Button>
                    </Stack>
                </form>
            </CardBox>
        </Box>
    )
}

export default InitialPopup