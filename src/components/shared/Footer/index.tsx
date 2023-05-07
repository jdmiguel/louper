import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { FOOTER_CONTENT, FOOTER_LINKS } from '@/utils/literals';
import Link from '../Link';

const [portfolioLink, octoverseLink] = FOOTER_LINKS;

const Root = styled('footer')(({ theme }) => ({
  alignItems: 'center',
  bottom: 0,
  color: theme.palette.secondary.light,
  display: 'none',
  fontSize: '0.9rem',
  padding: '12px 24px',
  position: 'absolute',
  width: '100%',
  '@media (min-width: 500px)': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  '@media (min-width: 1680px)': {
    fontSize: '1rem',
  },
  span: {
    marginRight: 5,
  },
}));

const Footer = () => (
  <Root data-testid="footer">
    <Stack direction="row" sx={{ marginRight: 0.6 }}>
      <span>{FOOTER_CONTENT.creation}</span>
      <Link
        url={portfolioLink.url}
        ariaLabel={portfolioLink.ariaLabel}
        content={portfolioLink.content}
      />
    </Stack>
    <span>|</span>
    <Stack direction="row">
      <span>{FOOTER_CONTENT.stats}</span>
      <Link
        url={octoverseLink.url}
        ariaLabel={octoverseLink.ariaLabel}
        content={octoverseLink.content}
      />
    </Stack>
  </Root>
);

export default Footer;
