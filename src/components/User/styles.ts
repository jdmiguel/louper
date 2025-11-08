import { styled } from '@mui/material/styles';

export const StyledRoot = styled('div')({
  minHeight: '100vh',
  padding: '0 30px',
  position: 'relative',
  maxWidth: 1200,
  margin: '0 auto',
  width: '100%',
  '@media (min-width: 768px)': {
    padding: '0 40px',
  },
});

export const StyledMain = styled('main')({
  display: 'flex',
  justifyContent: 'center',
  paddingBottom: 40,
  '@media (min-width: 768px)': {
    paddingBottom: 74,
  },
});

export const StyledLoaderWrapper = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1,
  overflow: 'hidden',
  width: '100%',
  height: 2,
});

export const StyledProfileWrapper = styled('aside')(({ theme }) => ({
  display: 'none',
  margin: '60px 50px 0 0',
  '@media (min-width: 768px)': {
    opacity: 0,
    animation: `${theme.animation.fadeInLeft} 600ms ease-out 300ms forwards`,
    display: 'block',
  },
}));

export const StyledDataWrapper = styled('div')(({ theme }) => ({
  width: '100%',
  opacity: 0,
  animation: `${theme.animation.fadeIn} 600ms ease-out 300ms forwards`,
  '@media (min-width: 768px)': {
    display: 'block',
    animation: `${theme.animation.fadeInRight} 600ms ease-out 300ms forwards`,
  },
  '@media (min-width: 992px)': {
    width: 'initial',
  },
}));
