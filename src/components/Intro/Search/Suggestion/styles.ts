import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const StyledButton = styled(Button)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
}));

export const StyledAvatarWrapper = styled('div')({
  height: 32,
  marginRight: 10,
  position: 'relative',
  width: 32,
});
