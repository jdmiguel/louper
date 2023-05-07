import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

export const StyledRoot = styled('footer')(({ theme }) => ({
  alignItems: 'center',
  bottom: 0,
  color: theme.palette.secondary.light,
  display: 'none',
  fontSize: '0.9rem',
  padding: '12px 24px',
  position: 'absolute',
  width: '100%',
  '@media (min-width: 500px)': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  span: {
    marginRight: 5,
  },
}));

export const StyledContent = styled(Stack)({
  marginRight: 0.6,
});
