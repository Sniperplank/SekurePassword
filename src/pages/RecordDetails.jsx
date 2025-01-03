import { Button, Stack, Typography } from '@mui/material'
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

    useEffect(() => {
        const hasChanges = JSON.stringify(updatedRecord) !== JSON.stringify(initialRecord.current);
        setIsChanged(hasChanges);
    }, [updatedRecord])


    return (
        <Stack spacing={5}>
            <Typography>{record._id}</Typography>
            <StyledInput variant='outlined' name='title' label='Title' defaultValue={record.title} onChange={handleChange} />
            <StyledInput variant='outlined' name='login' label='Login' defaultValue={record.login} onChange={handleChange} />
            <Stack direction='row' spacing={2}>
                <StyledInput variant='outlined' name='password' label='Password' defaultValue={record.password} type={isHidden ? 'password' : 'text'} onChange={handleChange} />
                <Button onClick={changeHiddenMode} endIcon={isHidden ? <VisibilityOffIcon /> : <VisibilityIcon />} />
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
            <Button onClick={goBack} sx={{ width: '50%', alignSelf: 'center' }}>Back</Button>
        </Stack>
    )
}

export default RecordDetails