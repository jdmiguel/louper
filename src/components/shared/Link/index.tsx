import { StyledLink, StyledIcon } from './styles';

type LinkProps = {
  url: string;
  ariaLabel: string;
  content: string;
};
type IconProps = { withIcon?: false; iconType?: never } | { withIcon: true; iconType?: string };
type Props = LinkProps & IconProps;

const Link = ({ url, ariaLabel, content, withIcon, iconType }: Props) => (
  <StyledLink href={url} rel="noopener noreferrer" aria-label={ariaLabel}>
    {withIcon && <StyledIcon>{iconType}</StyledIcon>}
    {content}
  </StyledLink>
);

export default Link;
