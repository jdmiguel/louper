import { styled } from '@mui/material/styles';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';

export const StyledRoot = styled('div')({
  alignItems: 'flex-end',
  display: 'flex',
});

export const StyledContent = styled(Typography)({
  color: 'text.secondary',
  lineHeight: 1.1,
  maxWidth: 350,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  textTransform: 'uppercase',
});

export const StyledIcon = styled(Icon)(({ theme }) => ({
  color: theme.palette.secondary.light,
  fontSize: 22,
  marginRight: 7,
}));
