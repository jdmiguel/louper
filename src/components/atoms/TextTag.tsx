/* material-ui */
import { styled } from '@mui/material/styles';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';

const Root = styled('div')({
  alignItems: 'center',
  display: 'flex',
});

const StyledIcon = styled(Icon)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: 22,
  marginRight: 5,
}));

type TextProps = { content: string; withLowerCase?: boolean };
type IconProps = { withIcon?: false; iconType?: never } | { withIcon: true; iconType?: string };
type Props = TextProps & IconProps;

const TextTag = ({ content, withLowerCase = false, withIcon, iconType }: Props) => (
  <Root>
    {withIcon && <StyledIcon>{iconType}</StyledIcon>}
    <Typography variant={withLowerCase ? 'body2' : 'h5'} sx={{ color: 'text.secondary' }}>
      {content}
    </Typography>
  </Root>
);

export default TextTag;
