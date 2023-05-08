import { styled } from '@mui/material/styles';

export const StyledRoot = styled('div')(({ theme }) => ({
  display: 'none',
  position: 'relative',
  userSelect: 'none',
  height: 450,
  width: 450,
  opacity: 0,
  animation: `${theme.animation.fadeInUp} 1400ms ease-out 300ms forwards`,
  '@media (min-width: 1200px)': {
    display: 'block',
    height: 520,
    width: 520,
  },
  '@media (min-width: 1440px)': {
    height: 580,
    width: 580,
  },
}));
