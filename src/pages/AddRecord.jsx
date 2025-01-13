import { Button, Divider, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StyledInput } from '../StyledComponents/StyledInput'
import { StyledButton } from '../StyledComponents/StyledButton'
import { useAuth } from '../contexts/AuthContext'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

function AddRecord() {
    const { user } = useAuth()
    const [recordDetails, setRecordDetails] = useState({ title: '', login: '', password: '', login_url: '', userEmail: user.result.email })
    const navigate = useNavigate()
    const [isHidden, setIsHidden] = useState(true)

    const changeHiddenMode = () => {
        setIsHidden(prev => !prev)
    }

    const handleAddRecord = async () => {
        await axios.post('http://localhost:5000/record', recordDetails)
        console.log('record added')
        navigate('/list')
    }

    const goBack = async () => {
        navigate('/list')
    }

    const handleChange = (e) => {
        setRecordDetails({ ...recordDetails, [e.target.name]: e.target.value })
    }

    const generatePassword = () => {
        const length = 16
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-="
        let password = ""
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length)
            password += charset[randomIndex]
        }
        return password
    };

    const autofillFields = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
                const activeTab = tabs[0]
                const url = activeTab.url || ''
                const title = activeTab.title || ''
                const generatedPassword = generatePassword()

                setRecordDetails((prevDetails) => ({
                    ...prevDetails,
                    title: title,
                    login: user.result.email,
                    password: generatedPassword,
                    login_url: url,
                }))

                console.log(`Autofilled: Title - ${title}, URL - ${url}`)
            } else {
                console.error('No active tab found to autofill fields.')
            }
        })
    }

    return (
        <Stack spacing={4}>
            <Typography variant='h5' color='primary'>New Record</Typography>
            <Divider sx={{ backgroundColor: 'primary.main' }}></Divider>
            <Stack spacing={3}>
                <StyledInput variant='outlined' name='title' label='Title' onChange={handleChange} />
                <StyledInput variant='outlined' name='login' label='Login' onChange={handleChange} />
                <Stack direction='row' spacing={1}>
                    <StyledInput variant='outlined' name='password' label='Password' onChange={handleChange} type={isHidden ? 'password' : 'text'} sx={{ width: '90%' }} />
                    {isHidden ? <VisibilityOffIcon onClick={changeHiddenMode} color='primary' sx={{ alignSelf: 'center', cursor: 'pointer' }} /> : <VisibilityIcon onClick={changeHiddenMode} color='primary' sx={{ alignSelf: 'center', cursor: 'pointer' }} />}
                </Stack>
                <StyledInput variant='outlined' name='login_url' label='URL' onChange={handleChange} />
            </Stack>
            <Button onClick={autofillFields} sx={{}}>Generate password and autofill</Button>
            <Stack direction='row' spacing={2} justifyContent='space-evenly'>
                <Button onClick={goBack} sx={{ width: '50%' }}>Back</Button>
                <StyledButton variant='contained' onClick={handleAddRecord} sx={{ width: '50%' }}>Add</StyledButton>
            </Stack>
        </Stack>
    )
}

export default AddRecord