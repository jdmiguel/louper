/* material-ui */
import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

const Root = styled('div')<{
  userTheme: boolean;
}>(({ theme, userTheme }) => ({
  border: `1px solid ${theme.palette.secondary.light}`,
  borderRadius: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: userTheme ? 122 : 188,
  padding: 20,
  opacity: 0.35,
}));

type Props = {
  withUserTheme?: boolean;
};

const Placeholder = ({ withUserTheme = false }: Props) => (
  <Root userTheme={withUserTheme}>
    <LinearProgress color="primary" />
    <LinearProgress color="secondary" />
    <LinearProgress color="primary" />
    <LinearProgress color="secondary" />
  </Root>
);

export default Placeholder;
