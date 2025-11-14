import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const StyledButton = styled(Button)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.main}`,
  color: theme.palette.text.secondary,
  padding: 10,
  transition: 'background-color ease-out 250ms',
  '&:hover': {
    backgroundColor: theme.palette.overlay.dark,
  },
}));

export const StyledAvatarWrapper = styled('div')({
  height: 32,
  marginRight: 10,
  position: 'relative',
  width: 32,
});
