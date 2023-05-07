import { styled } from '@mui/material/styles';

export const StyledRoot = styled('div')(({ theme }) => ({
  display: 'none',
  height: 510,
  position: 'relative',
  userSelect: 'none',
  width: 510,
  opacity: 0,
  animation: `${theme.animation.fadeInUp} 1400ms ease-out 300ms forwards`,
  '@media (min-width: 1200px)': {
    display: 'block',
  },
  '@media (min-width: 1440px)': {
    height: 580,
    width: 580,
  },
}));
