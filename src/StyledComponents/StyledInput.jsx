import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledInput = styled(TextField)(({ theme }) => ({
    '& label.Mui-focused': {
        color: theme.palette.primary.main,
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: theme.palette.primary.main,
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: theme.palette.text.main,
        },
        '&:hover fieldset': {
            borderColor: theme.palette.text.input,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
        },
    },
    '& .MuiFormLabel-root': {
        color: theme.palette.text.main,
    },
    '& .MuiInputBase-root': {
        color: theme.palette.text.input,
    },
}));