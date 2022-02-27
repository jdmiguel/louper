import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '../atoms/Link';

const spacer = 0.6;

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
    <Stack direction="row" sx={{ marginRight: spacer }}>
      <Typography variant="body1" sx={{ color: 'text.secondary', marginRight: spacer }}>
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
        marginRight: spacer,
        '@media (min-width: 768px)': {
          display: 'block',
        },
      }}
    >
      |
    </Typography>
    <Stack direction="row">
      <Typography variant="body1" sx={{ color: 'text.secondary', marginRight: spacer }}>
        github stats from
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
