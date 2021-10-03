/* material-ui */
import { styled } from '@mui/styles';
import CircularProgress from '@mui/material/CircularProgress';

const Root = styled('div')({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Loader = () => (
  <Root>
    <CircularProgress className="loaderIcon" size={50} thickness={5} />
  </Root>
);

export default Loader;
