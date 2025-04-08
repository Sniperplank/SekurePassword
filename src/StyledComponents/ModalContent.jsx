import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ModalContent = styled(Box)(({ theme }) => ({
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.palette.secondary.main,
    padding: '50px',
    zIndex: 1000,
    borderRadius: 10,
    color: theme.palette.text.main,
    border: 'solid',
    borderWidth: 2,
    borderColor: theme.palette.primary.main
}));