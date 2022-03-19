import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Link from '../Link';

const Root = styled('footer')(({ theme }) => ({
  alignItems: 'center',
  color: theme.palette.secondary.light,
  display: 'flex',
  flexDirection: 'column',
  fontSize: '0.9rem',
  padding: '12px 24px',
  '@media (min-width: 768px)': {
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    width: '100%',
  },
  '@media (min-width: 1680px)': {
    fontSize: '1rem',
  },
  span: {
    marginRight: 5,
  },
  '> span': {
    display: 'none',
    '@media (min-width: 768px)': {
      display: 'block',
    },
  },
}));

const Footer = () => (
  <Root data-testid="footer">
    <Stack direction="row" sx={{ marginRight: 0.6 }}>
      <span>@2022 | created by</span>
      <Link
        url="https://jdmiguel.netlify.app/"
        ariaLabel="View profile of jdmiguel on GitHub"
        content="jdmiguel"
      />
    </Stack>
    <span>|</span>
    <Stack direction="row">
      <span>github stats from</span>
      <Link
        url="https://octoverse.github.com/#future"
        ariaLabel="View github users statistics on octoverse"
        content="octoverse"
      />
    </Stack>
  </Root>
);

export default Footer;
