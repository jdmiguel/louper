import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

export const StyledTextField = styled<any>(TextField)(({ theme }) => ({
  transition: 'all ease-out 250ms',

  '& .MuiOutlinedInput-root': {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    '@media (min-width: 400px)': {
      minWidth: 300,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        background: theme.palette.overlay.dark,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    background: theme.palette.overlay.dark,
    borderWidth: '1px !important',
    borderColor: theme.palette.primary.main,
  },
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 4,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 4,
  color: theme.palette.text.primary,
  minHeight: 40,
  minWidth: 40,
  padding: 7,
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
}));
