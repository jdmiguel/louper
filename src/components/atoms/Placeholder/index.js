/* material-ui */
import { styled } from '@mui/material/styles';

const Root = styled('div')(({ theme }) => ({
  flexDirection: 'column',
  border: `1px solid ${theme.palette.secondary.light}`,
  borderRadius: 4,
  display: 'flex',
  justifyContent: 'space-between',
  padding: 20,
}));

const Content = styled('div')(({ theme }) => ({
  animation: `${theme.animation.shimmer} 2000ms linear infinite`,
  backgroundSize: '1200px 100%',
  backgroundColor: theme.palette.background.default,
  backgroundImage:
    '-webkit-gradient(linear,left top,right top,from(rgba(0,0,0,.08)),color-stop(15%,rgba(0,0,0,.15)),color-stop(30%,rgba(0,0,0,.08)))',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 8,
  overflow: 'hidden',
  willChange: 'background-position-x',
}));

const Block = styled('span')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: 8,
  marginBottom: 12,
  overflow: 'hidden',
  position: 'relative',
  width: '100%',
}));

const Divider = styled('span')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: 30,
  marginBottom: 2,
  width: '100%',
}));

const Placeholder = () => (
  <Root>
    <Content>
      <Block />
      <Block />
      <Block />
      <Divider />
      <Block />
    </Content>
  </Root>
);

export default Placeholder;
