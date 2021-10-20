/* material-ui */
import { styled } from '@mui/material/styles';
import MuiLink from '@mui/material/Link';
import Icon from '@mui/material/Icon';

const StyledLink = styled(MuiLink)(({ theme }) => ({
  cursor: 'pointer',
  alignItems: 'center',
  display: 'flex',
  fontSize: '0.9rem',
  fontWeight: 700,
  lineHeight: 0,
  textDecoration: 'none',
  transition: 'color ease-out 250ms',
  '& span': { transition: 'color ease-out 250ms' },
  '&:hover': {
    color: theme.palette.primary.light,
    '& span': { color: theme.palette.primary.light },
  },
}));

const StyledIcon = styled(Icon)(({ theme }) => ({
  color: theme.palette.primary.dark,
  fontSize: 22,
  marginRight: 5,
}));

type Props = {
  url: string;
  ariaLabel: string;
  content: string;
  withIcon?: boolean;
  iconType?: string;
};

const Link = ({ url, ariaLabel, content, withIcon, iconType }: Props) => (
  <StyledLink href={url} rel="noopener noreferrer" aria-label={ariaLabel}>
    {withIcon && <StyledIcon>{iconType}</StyledIcon>}
    {content}
  </StyledLink>
);

export default Link;
