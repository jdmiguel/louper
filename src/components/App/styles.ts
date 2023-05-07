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
});

export const StyledErrorMessage = styled('p')(({ theme }) => ({
  color: theme.palette.error.main,
}));

export const StyledAppRoot = styled('div')(({ theme }) => ({
  background: colors.darkGradient,
  backgroundAttachment: 'fixed',
  minHeight: '100vh',
  animation: `${theme.animation.fadeIn} 1500ms`,
}));
