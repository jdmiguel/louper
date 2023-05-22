import { styled } from '@mui/material/styles';

export const StyledRoot = styled('div')(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  opacity: 0,
  animation: `${theme.animation.fadeIn} 1400ms 300ms forwards`,
}));

export const StyledHeader = styled('header')({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  marginBottom: 36,
});

export const StyledLogoWrapper = styled('h1')({
  transform: 'scale(0.8)',
  '@media (min-width: 1440px)': {
    transform: 'scale(0.9)',
  },
});

export const StyledSuggestionsWrapper = styled('div')({
  height: 260,
  padding: '0 18px',
});

export const StyledWatermarkWrapper = styled('div')({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  marginTop: 30,
});
