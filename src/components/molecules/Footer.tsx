/* material-ui */
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

/* atoms */
import Link from '../atoms/Link';

const Root = styled('footer')({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  opacity: 1,
  padding: '12px 24px',
  position: 'absolute',
  bottom: 0,
  visibility: 'visible',
  width: '100%',
});

const Footer = () => {
  return (
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
};

export default Footer;
