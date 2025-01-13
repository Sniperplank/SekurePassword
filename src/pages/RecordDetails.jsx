import { Button, Divider, Stack, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { StyledInput } from '../StyledComponents/StyledInput'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { StyledButton } from '../StyledComponents/StyledButton'
import axios from 'axios'

function RecordDetails() {
    const location = useLocation()
    const record = location.state?.record
    const [updatedRecord, setUpdatedRecord] = useState({ ...record })
    const [isHidden, setIsHidden] = useState(true)
    const [isChanged, setIsChanged] = useState(false)
    const navigate = useNavigate()
    const initialRecord = useRef({ ...record })

    const changeHiddenMode = () => {
        setIsHidden(prev => !prev)
    }

    const handleChange = (e) => {
        setUpdatedRecord({ ...updatedRecord, [e.target.name]: e.target.value })
    }

    const goBack = async () => {
        navigate('/list')
    }

    const saveChanges = async () => {
        try {
            await axios.patch('http://localhost:5000/record/', updatedRecord)
            setIsChanged(false)
            initialRecord.current = { ...updatedRecord }
        } catch (error) {
            console.log("an error occurred!", error)
        }
    }

    const deleteRecord = async () => {
        try {
            await axios.delete('http://localhost:5000/record?id=' + record._id)
            navigate('/list')
        } catch (error) {
            console.log(error)
        }
    }

    // Function to inject into the page to handle password fields
    const autoFillCredentials = (credentialsString) => {

        const { username, password } = JSON.parse(credentialsString)
        // Find all input fields
        const inputs = document.querySelectorAll('input')

        // Track if we found and filled the fields
        let foundUsername = false
        let foundPassword = false

        inputs.forEach(input => {
            // Get computed style to check visibility
            const style = window.getComputedStyle(input)
            if (style.display === 'none' || style.visibility === 'hidden') return

            // Username field detection - check multiple common attributes
            if (!foundUsername && (
                input.type === 'text' ||
                input.type === 'email' ||
                input.name?.toLowerCase().includes('user') ||
                input.name?.toLowerCase().includes('email') ||
                input.id?.toLowerCase().includes('user') ||
                input.id?.toLowerCase().includes('email')
            )) {
                // Set value and dispatch events to trigger site's JavaScript
                input.value = username
                input.dispatchEvent(new Event('input', { bubbles: true }))
                input.dispatchEvent(new Event('change', { bubbles: true }))
                foundUsername = true
            }

            // Password field detection
            if (!foundPassword && input.type === 'password') {
                input.value = password
                input.dispatchEvent(new Event('input', { bubbles: true }))
                input.dispatchEvent(new Event('change', { bubbles: true }))
                foundPassword = true
            }
        });

        return { foundUsername, foundPassword }
    };

    // Add this function to your RecordsList component:
    const fillCredentials = async () => {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

            const credentialsString = JSON.stringify({
                username: record.login,
                password: record.password
            })

            const [{ result }] = await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: autoFillCredentials,
                args: [credentialsString] // Pass credentials to the injected function
            })

            if (result.foundUsername || result.foundPassword) {
                console.log('Successfully filled credentials')
            } else {
                console.log('No matching fields found')
            }

        } catch (error) {
            console.error('Error filling credentials:', error);
        }
    };

    useEffect(() => {
        const hasChanges = JSON.stringify(updatedRecord) !== JSON.stringify(initialRecord.current)
        setIsChanged(hasChanges)
    }, [updatedRecord])


    return (
        <Stack spacing={5}>
            <Typography variant='h5' color='primary'>Edit Record</Typography>
            <Divider sx={{ backgroundColor: 'primary.main' }}></Divider>
            <StyledInput variant='outlined' name='title' label='Title' defaultValue={record.title} onChange={handleChange} />
            <StyledInput variant='outlined' name='login' label='Login' defaultValue={record.login} onChange={handleChange} />
            <Stack direction='row' spacing={2}>
                <StyledInput variant='outlined' name='password' label='Password' defaultValue={record.password} type={isHidden ? 'password' : 'text'} onChange={handleChange} sx={{ width: '90%' }} />
                {isHidden ? <VisibilityOffIcon onClick={changeHiddenMode} color='primary' sx={{ alignSelf: 'center', cursor: 'pointer' }} /> : <VisibilityIcon onClick={changeHiddenMode} color='primary' sx={{ alignSelf: 'center', cursor: 'pointer' }} />}
            </Stack>
            <StyledInput variant='outlined' name='login_url' label='URL' defaultValue={record.login_url} onChange={handleChange} />
            {
                isChanged && (
                    <Stack spacing={2} sx={{ alignSelf: 'center' }}>
                        <Typography variant='h6' color='error'>You have unsaved changes!</Typography>
                        <StyledButton variant='contained' onClick={saveChanges} sx={{ width: '50%', alignSelf: 'center' }}>Save</StyledButton>
                    </Stack>
                )
            }
            <StyledButton variant='contained' onClick={fillCredentials}>Autofill Record</StyledButton>
            <Button onClick={deleteRecord} sx={{ width: '50%', alignSelf: 'center' }} color='error'>Delete</Button>
            <Button onClick={goBack} sx={{ width: '50%', alignSelf: 'center' }}>Back</Button>
        </Stack>
    )
}

export default RecordDetails