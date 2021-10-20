/* material-ui */
import Typography from '@mui/material/Typography';

/* atoms */
import Link from '../atoms/Link';

/* styles */
import { FooterRoot } from './styles';

const Footer = () => (
  <FooterRoot>
    <Typography variant="body1" sx={{ marginRight: 0.7 }}>
      COPYRIGHT @2021 | Created by{' '}
    </Typography>
    <Link
      url="https://jdmiguel.netlify.app/"
      ariaLabel="View profile of jdmiguel on GitHub"
      content="jdmiguel"
    />
  </FooterRoot>
);

export default Footer;
