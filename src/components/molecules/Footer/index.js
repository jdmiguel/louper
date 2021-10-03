/* material-ui */
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Root = styled('footer')({
  position: 'absolute',
  left: 0,
  bottom: 0,
  zIndex: 2,
  height: 'auto',
  width: '100%',
});

const Content = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 16px 16px',
});

const Footer = () => (
  <Root>
    <Content>
      <Typography variant="body2">
        COPYRIGHT @2021 | Created by{' '}
        <Link
          sx={{ fontWeight: 700 }}
          href="https://jdmiguel.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View source on GitHub"
        >
          jdmiguel
        </Link>
      </Typography>
    </Content>
  </Root>
);

export default Footer;
