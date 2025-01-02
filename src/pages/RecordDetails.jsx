import { Button, Stack } from '@mui/material'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { StyledInput } from '../StyledComponents/StyledInput'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

function RecordDetails() {
    const location = useLocation()
    const record = location.state?.record
    const [isHidden, setIsHidden] = useState(true)
    const navigate = useNavigate()

    const changeHiddenMode = () => {
        setIsHidden(prev => !prev)
    }

    const handleChange = (e) => {

    }

    const goBack = async () => {
        navigate('/list')
    }

    return (
        <Stack spacing={5}>
            <StyledInput variant='outlined' name='title' label='Title' value={record.title} onChange={handleChange} />
            <StyledInput variant='outlined' name='login' label='Login' value={record.login} onChange={handleChange} />
            <Stack direction='row' spacing={2}>
                <StyledInput variant='outlined' name='password' label='Password' value={record.password} type={isHidden ? 'password' : 'text'} onChange={handleChange}/>
                <Button onClick={changeHiddenMode} endIcon={isHidden ? <VisibilityOffIcon /> : <VisibilityIcon />} />
            </Stack>
            <StyledInput variant='outlined' name='login_url' label='URL' value={record.login_url} onChange={handleChange} />
            <Button onClick={goBack}>Back</Button>
        </Stack>
    )
}

export default RecordDetails