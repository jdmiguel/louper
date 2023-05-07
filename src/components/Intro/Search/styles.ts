import { styled } from '@mui/material/styles';

export const StyledRoot = styled('div')(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  opacity: 0,
  animation: `${theme.animation.fadeIn} 1400ms 300ms forwards`,
  '@media (min-width: 1200px)': {
    minWidth: 600,
  },
  '@media (min-width: 1440px)': {
    marginRight: 60,
    minWidth: 620,
  },
}));

export const StyledLogoWrapper = styled('h1')({
  lineHeight: 0,
  transform: 'scale(0.9)',
  '@media (min-width: 768px)': {
    transform: 'scale(1)',
  },
});

export const StyledSuggestionsWrapper = styled('div')({
  height: 260,
  marginTop: 20,
});

export const StyledWatermarkWrapper = styled('div')({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  marginTop: 10,
  opacity: 0.15,
});
