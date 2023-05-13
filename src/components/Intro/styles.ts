import { styled } from '@mui/material/styles';

export const StyledRoot = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: '100vh',
});

export const StyledCornerWrapper = styled('header')({
  display: 'none',
  '@media (min-width: 1200px)': {
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 0,
    width: '100%',
  },
});

export const StyledMain = styled('main')({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  '@media (min-width: 992px)': {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 110,
  },
  '@media (min-width: 1440px)': {
    gap: 140,
  },
});
