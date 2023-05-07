import { styled } from '@mui/material/styles';

export const StyledRoot = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: '100vh',
});

export const StyledCornerWrapper = styled('header')({
  display: 'flex',
  justifyContent: 'flex-end',
  position: 'absolute',
  top: 0,
  width: '100%',
});

export const StyledMain = styled('main')({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 20,
  '@media (min-width: 768px)': {
    marginBottom: 50,
  },
  '@media (min-width: 992px)': {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 0,
  },
  '@media (min-width: 1440px)': {
    justifyContent: 'center',
  },
});
