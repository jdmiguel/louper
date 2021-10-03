/* material-ui */
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Root = styled('footer')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 16px 16px',
});

const StyledLink = styled(Link)(({ theme }) => ({
  fontWeight: 700,
  textDecoration: 'none',
  color: theme.palette.primary.dark,
  transition: 'color ease-out 250ms',
  '&:hover': {
    color: theme.palette.primary.light,
  },
}));

const Footer = () => (
  <Root>
    <Typography variant="body2">
      COPYRIGHT @2021 | Created by{' '}
      <StyledLink
        href="https://jdmiguel.netlify.app/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View source on GitHub"
      >
        jdmiguel
      </StyledLink>
    </Typography>
  </Root>
);

export default Footer;
