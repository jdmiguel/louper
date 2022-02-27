import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '../atoms/Link';

const Root = styled('footer')({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  padding: '12px 24px',
  '@media (min-width: 768px)': {
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    width: '100%',
  },
});

const Footer = () => (
  <Root>
    <Stack direction="row" sx={{ marginRight: 0.6 }}>
      <Typography variant="body1" sx={{ color: 'text.secondary', marginRight: 1 }}>
        @2022 | created by
      </Typography>
      <Link
        url="https://jdmiguel.netlify.app/"
        ariaLabel="View profile of jdmiguel on GitHub"
        content="jdmiguel"
      />
    </Stack>
    <Typography
      variant="body1"
      sx={{
        color: 'text.secondary',
        display: 'none',
        marginRight: 0.6,
        '@media (min-width: 768px)': {
          display: 'block',
        },
      }}
    >
      |
    </Typography>
    <Stack direction="row">
      <Typography variant="body1" sx={{ color: 'text.secondary', marginRight: 1 }}>
        statistics from{' '}
      </Typography>
      <Link
        url="https://octoverse.github.com/#future"
        ariaLabel="View github users statistics on octoverse"
        content="octoverse"
      />
    </Stack>
  </Root>
);

export default Footer;
