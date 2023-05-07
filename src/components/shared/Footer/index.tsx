import Stack from '@mui/material/Stack';
import { FOOTER_CONTENT, FOOTER_LINKS } from '@/utils/literals';
import Link from '../Link';
import { StyledRoot, StyledContent } from './styles';

const [portfolioLink, octoverseLink] = FOOTER_LINKS;

const Footer = () => (
  <StyledRoot data-testid="footer">
    <StyledContent direction="row">
      <span>{FOOTER_CONTENT.creation}</span>
      <Link
        url={portfolioLink.url}
        ariaLabel={portfolioLink.ariaLabel}
        content={portfolioLink.content}
      />
    </StyledContent>
    <span>|</span>
    <Stack direction="row">
      <span>{FOOTER_CONTENT.stats}</span>
      <Link
        url={octoverseLink.url}
        ariaLabel={octoverseLink.ariaLabel}
        content={octoverseLink.content}
      />
    </Stack>
  </StyledRoot>
);

export default Footer;
