import { styled } from '@mui/material/styles';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';

const Root = styled('div')({
  alignItems: 'flex-end',
  display: 'flex',
});

const StyledIcon = styled(Icon)(({ theme }) => ({
  color: theme.palette.secondary.light,
  fontSize: 22,
  marginRight: 7,
}));

type TextProps = { content: string; withUppercase?: boolean };
type IconProps = { withIcon?: false; iconType?: never } | { withIcon: true; iconType?: string };
type Props = TextProps & IconProps;

const TextTag = ({ content, withUppercase, withIcon, iconType }: Props) => (
  <Root>
    {withIcon && <StyledIcon>{iconType}</StyledIcon>}
    <Typography
      variant={withUppercase ? 'h5' : 'body1'}
      sx={{
        color: 'text.secondary',
        lineHeight: 1.1,
        maxWidth: 350,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        textTransform: 'uppercase',
      }}
    >
      {content}
    </Typography>
  </Root>
);

export default TextTag;
