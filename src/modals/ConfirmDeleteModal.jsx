import React from 'react'
import ReactDOM from 'react-dom'
import { ModalContent } from '../StyledComponents/ModalContent'
import { ModalOverlay } from '../StyledComponents/ModalOverlay'
import { Stack, Typography } from '@mui/material'
import { StyledButton } from '../StyledComponents/StyledButton'

function ConfirmDeleteModal({ open, onClose, deleteRecord }) {
    if (!open) return null
    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClick={onClose} />
            <ModalContent width='50%'>
                <Stack spacing={4}>
                    <Typography variant='h5'>Are you sure you want to delete this record?</Typography>
                    <Stack spacing={3} direction='row'>
                        <StyledButton variant='contained' color='primary' onClick={deleteRecord}>Yes</StyledButton>
                        <StyledButton variant='contained' color='error' onClick={onClose}>Cancel</StyledButton>
                    </Stack>
                </Stack>
            </ModalContent >
        </>,
        document.getElementById('confirmDelete')
    )
}

export default ConfirmDeleteModal