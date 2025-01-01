import { Button, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { StyledInput } from '../StyledComponents/StyledInput'
import { StyledButton } from '../StyledComponents/StyledButton'

function AddRecord() {
    const location = useLocation()
    const { user } = location.state
    const [recordDetails, setRecordDetails] = useState({ title: '', login: '', password: '', login_url: '', userEmail: user.result.email })
    const navigate = useNavigate()

    const handleAddRecord = async () => {
        await axios.post('http://localhost:5000/record', recordDetails)
        console.log('record added')
        navigate('/list', { state: { user: user }})
    }

    const goBack = async () => {
        navigate('/list', { state: { user: user }})
    }

    const handleChange = (e) => {
        setRecordDetails({ ...recordDetails, [e.target.name]: e.target.value })
    }

    return (
        <Stack spacing={4}>
            <Typography variant='h4'>New Record Entry</Typography>
            <Stack spacing={3}>
                <StyledInput variant='outlined' name='title' label='Title' onChange={handleChange} />
                <StyledInput variant='outlined' name='login' label='Login' onChange={handleChange} />
                <StyledInput variant='outlined' name='password' label='Password' onChange={handleChange} />
                <StyledInput variant='outlined' name='login_url' label='URL' onChange={handleChange} />
            </Stack>
            <StyledButton variant='contained' onClick={handleAddRecord}>Add</StyledButton>
            <Button onClick={goBack}>Back</Button>
        </Stack>
    )
}

export default AddRecord