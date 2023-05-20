import { styled } from '@mui/material/styles';

export const StyledRoot = styled('svg')(({ theme }) => ({
  opacity: 0,
  animation: `${theme.animation.fadeIn} 200ms forwards`,
}));
