import { styled } from '@mui/material/styles';
import MuiLink from '@mui/material/Link';
import Icon from '@mui/material/Icon';

export const StyledLink = styled(MuiLink)(({ theme }) => ({
  cursor: 'pointer',
  alignItems: 'center',
  display: 'flex',
  textDecoration: 'none',
  transition: 'color ease-out 250ms',
  span: { transition: 'color ease-out 250ms' },
  '&:hover': {
    color: theme.palette.primary.light,
    span: { color: theme.palette.primary.light },
  },
}));

export const StyledIcon = styled(Icon)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: 22,
  marginRight: 5,
}));
