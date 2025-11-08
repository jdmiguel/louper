import { styled } from '@mui/material/styles';
import { colors } from '@/utils/colors';

export const StyledRoot = styled('div')(({ theme }) => ({
  background: colors.darkGradient,
  backgroundAttachment: 'fixed',
  minHeight: '100vh',
  animation: `${theme.animation.fadeIn} 1500ms`,
  '@media (min-width: 768px)': {
    background: colors.darkGradientDesktop,
  },
}));
