/* material-ui */
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

const Root = styled('div')(({ theme }) => ({
  flexDirection: 'column',
  border: `1px solid ${theme.palette.secondary.light}`,
  borderRadius: 4,
  display: 'flex',
  justifyContent: 'space-between',
  padding: 20,
}));

const Shimmer = styled('div')(({ theme }) => ({
  animation: `${theme.animation.shimmer} 2000ms linear infinite`,
  backgroundSize: '1200px 100%',
  backgroundColor: 'transparent',
  backgroundImage:
    '-webkit-gradient(linear,left top,right top,from(rgba(0,0,0,.08)),color-stop(15%,rgba(0,0,0,.15)),color-stop(30%,rgba(0,0,0,.08)))',
  overflow: 'hidden',
  willChange: 'background-position-x',
}));

const RepoLine = styled('span')({
  backgroundColor: 'transparent',
  height: 14,
  marginBottom: 12,
  width: '100%',
});

const RepoDivider = styled('span')({
  backgroundColor: 'transparent',
  height: 30,
  marginBottom: 2,
  width: '100%',
});

const UserVline = styled('span')({
  backgroundColor: 'transparent',
  marginLeft: 85,
  width: 16,
});

const UserHline = styled('span')({
  backgroundColor: 'transparent',
  height: 16,
  width: '100%',
  '&:not(:last-of-type)': {
    marginBottom: 17,
  },
});

const RepoTheme = (
  <Stack justifyContent="center" sx={{ marginBottom: 0.4 }}>
    <RepoLine />
    <RepoLine />
    <RepoLine />
    <RepoDivider />
    <RepoLine />
  </Stack>
);

const UserTheme = (
  <Stack direction="row">
    <UserVline />
    <Stack sx={{ width: '100%' }}>
      <UserHline />
      <UserHline />
      <UserHline />
    </Stack>
  </Stack>
);

type Props = {
  withUserTheme?: boolean;
};

const Placeholder = ({ withUserTheme = false }: Props) => (
  <Root>
    <Shimmer>{!withUserTheme ? RepoTheme : UserTheme}</Shimmer>
  </Root>
);

export default Placeholder;
