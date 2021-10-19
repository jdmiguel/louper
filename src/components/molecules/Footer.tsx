/* material-ui */
import Typography from '@mui/material/Typography';

/* styles */
import { FooterRoot, FooterLink } from './styles';

const Footer = () => (
  <FooterRoot>
    <Typography variant="body1">
      COPYRIGHT @2021 | Created by{' '}
      <FooterLink
        href="https://jdmiguel.netlify.app/"
        target="_self"
        rel="noopener noreferrer"
        aria-label="View profile of jdmiguel on GitHub"
      >
        jdmiguel
      </FooterLink>
    </Typography>
  </FooterRoot>
);

export default Footer;
