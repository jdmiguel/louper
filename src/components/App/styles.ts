import { styled } from '@mui/material/styles';
import { colors } from '@/utils/colors';

export const StyledFallbackAppRoot = styled('div')({
  background: colors.darkGradient,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  '& p': {
    margin: 0,
  },
  '@media (min-width: 768px)': {
    background: colors.darkGradientDesktop,
  },
});

export const StyledErrorMessage = styled('p')(({ theme }) => ({
  color: theme.palette.error.main,
}));
