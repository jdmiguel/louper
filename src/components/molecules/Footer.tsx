/* material-ui */
import { styled } from '@mui/styles';
import Typography from '@mui/material/Typography';

/* atoms */
import Link from '../atoms/Link';

const Root = styled('footer')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 16px 24px',
});

const Footer = () => (
  <Root>
    <Typography variant="body1" sx={{ marginRight: 0.7 }}>
      COPYRIGHT @2021 | Created by{' '}
    </Typography>
    <Link
      url="https://jdmiguel.netlify.app/"
      ariaLabel="View profile of jdmiguel on GitHub"
      content="jdmiguel"
    />
  </Root>
);

export default Footer;
