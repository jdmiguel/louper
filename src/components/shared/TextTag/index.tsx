import { StyledRoot, StyledContent, StyledIcon } from './styles';

type TextProps = { content: string; withUppercase?: boolean };
type IconProps = { withIcon?: false; iconType?: never } | { withIcon: true; iconType?: string };
type Props = TextProps & IconProps;

const TextTag = ({ content, withUppercase, withIcon, iconType }: Props) => (
  <StyledRoot>
    {withIcon && <StyledIcon>{iconType}</StyledIcon>}
    <StyledContent variant={withUppercase ? 'h5' : 'body1'}>{content}</StyledContent>
  </StyledRoot>
);

export default TextTag;
