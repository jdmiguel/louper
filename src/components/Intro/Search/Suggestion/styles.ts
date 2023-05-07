import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const StyledButton = styled(Button)(({ theme }) => ({
  height: 44,
  minWidth: 160,
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
  '@media (min-width: 768px)': {
    minWidth: 180,
  },
}));

export const StyledAvatarWrapper = styled('div')({
  height: 32,
  marginRight: 10,
  position: 'relative',
  width: 32,
});
