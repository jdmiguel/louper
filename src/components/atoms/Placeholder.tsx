/* material-ui */
import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

const Root = styled('div')(({ theme }) => ({
  border: `1px solid ${theme.palette.secondary.light}`,
  borderRadius: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: 122,
  padding: 20,
  opacity: 0.35,
}));

const Placeholder = () => (
  <Root>
    <LinearProgress color="secondary" />
    <LinearProgress color="secondary" />
    <LinearProgress color="secondary" />
    <LinearProgress color="secondary" />
  </Root>
);

export default Placeholder;
