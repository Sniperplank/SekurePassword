import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CardBox = styled(Box)(({ theme }) => ({
    borderRadius: 15,
    backgroundColor: theme.palette.secondary.main,
    boxShadow: 3,
    padding: 40,
    paddingLeft: 50,
    paddingRight: 50,
    color: theme.palette.text.main,
    textDecoration: 'none',
}));