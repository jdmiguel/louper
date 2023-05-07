import { styled } from '@mui/material/styles';

export const StyledRoot = styled('div')({
  minHeight: '100vh',
  padding: '0 20px',
  position: 'relative',
});

export const StyledMain = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  paddingBottom: 40,
  '@media (min-width: 768px)': {
    paddingBottom: 74,
  },
});

export const StyledProfileWrapper = styled('div')(({ theme }) => ({
  display: 'none',
  margin: '60px 50px 0 0',
  opacity: 0,
  animation: `${theme.animation.fadeInLeft} 600ms ease-out 300ms forwards`,
  '@media (min-width: 768px)': {
    display: 'block',
  },
}));

export const StyledDataWrapper = styled('div')(({ theme }) => ({
  width: '100%',
  opacity: 0,
  animation: `${theme.animation.fadeInRight} 600ms ease-out 300ms forwards`,
  '@media (min-width: 992px)': {
    width: 'initial',
  },
}));
