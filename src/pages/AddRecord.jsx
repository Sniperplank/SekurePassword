import { Button, OutlinedInput, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

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

    const handleChange = (e) => {
        setRecordDetails({ ...recordDetails, [e.target.name]: e.target.value })
    }

    return (
        <Stack>
            <Typography>New Record Entry</Typography>
            <Stack>
                <OutlinedInput variant='outlined' name='title' label='Title' onChange={handleChange} />
                <OutlinedInput variant='outlined' name='login' label='Login' onChange={handleChange} />
                <OutlinedInput variant='outlined' name='password' label='Password' onChange={handleChange} />
                <OutlinedInput variant='outlined' name='login_url' label='URL' onChange={handleChange} />
            </Stack>
            <Button variant='contained' onClick={handleAddRecord}>Add</Button>
        </Stack>
    )
}

export default AddRecord