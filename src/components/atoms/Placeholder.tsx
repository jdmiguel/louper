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

const Shimmer = styled('div')(({ theme }) => ({
  animation: `${theme.animation.shimmer} 2000ms linear infinite`,
  backgroundSize: '1200px 100%',
  backgroundColor: theme.palette.background.default,
  backgroundImage:
    '-webkit-gradient(linear,left top,right top,from(rgba(0,0,0,.08)),color-stop(15%,rgba(0,0,0,.15)),color-stop(30%,rgba(0,0,0,.08)))',
  overflow: 'hidden',
  willChange: 'background-position-x',
}));

const RepoContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 8,
});

const RepoLine = styled('span')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: 14,
  marginBottom: 12,
  width: '100%',
}));

const RepoDivider = styled('span')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: 30,
  marginBottom: 2,
  width: '100%',
}));

const UserContent = styled('div')({
  display: 'flex',
});

const UserVline = styled('span')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  marginLeft: 85,
  width: 16,
}));

const UserHlines = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

const UserHline = styled('span')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: 16,
  width: '100%',
  '&:not(:last-of-type)': {
    marginBottom: 17,
  },
}));

const RepoTheme = (
  <RepoContent>
    <RepoLine />
    <RepoLine />
    <RepoLine />
    <RepoDivider />
    <RepoLine />
  </RepoContent>
);

const UserTheme = (
  <UserContent>
    <UserVline />
    <UserHlines>
      <UserHline />
      <UserHline />
      <UserHline />
    </UserHlines>
  </UserContent>
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
