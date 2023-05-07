import { styled } from '@mui/material/styles';

export const StyledRoot = styled('div')({
  display: 'flex',
  marginTop: 20,
  '@media (min-width: 768px)': {
    display: 'none',
  },
});

export const StyledAvatarWrapper = styled('div')({
  height: 90,
  marginRight: 20,
  position: 'relative',
  width: 90,
});
