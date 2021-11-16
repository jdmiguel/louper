import { useState, useEffect, useMemo, ChangeEvent } from 'react';

/* material-ui */
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';

/* atoms */
import GithubCorner from '../atoms/GithubCorner';
import GithubIcon from '../atoms/GithubIcon';

/* molecules */
import Finder from '../molecules/Finder';
import Footer from '../molecules/Footer';
import Toast from '../molecules/Toast';

/* request */
import { ResponseError, BASE_URL, handleErrors } from '../../utils/request';

/* types */
import { User } from '../../utils/types';
import { ThemeMode } from '../App';

enum ErrorMsg {
  MAX = 'You have excedeed the maximum allowed request. Please, wait for a while',
  NO_USER = 'Please, choose an available user',
}

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100vh',
});

const IconWrapper = styled('div')(({ theme }) => ({
  '& svg': {
    width: 44,
    marginLeft: 4,
    '& path': {
      fill: theme.palette.text.primary,
    },
    '@media (min-width: 768px)': {
      width: 64,
      marginLeft: 12,
    },
  },
}));

const StyledSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-thumb': {
    color: theme.palette.primary.main,
  },
  '& .MuiSwitch-track': {
    backgroundColor: theme.palette.primary.light,
  },
}));

const label = { inputProps: { 'aria-label': 'Switch theme' } };

type Props = {
  onFetchUser: (user: User) => void;
  changeTheme: (themeMode: ThemeMode) => void;
};

const HomePage = ({ onFetchUser, changeTheme }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorToastOpen, setIsErrorToastOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const theme = useTheme();
  const isLightTheme = theme.palette.mode === 'light';

  const abortController = useMemo(() => new AbortController(), []);

  useEffect(() => {
    return () => {
      abortController.abort();
    };
  }, [abortController]);

  const fetchUser = (userName: string) => {
    setIsLoading(true);

    fetch(`${BASE_URL}/users/${userName}`, { signal: abortController.signal })
      .then(handleErrors)
      .then((user: User) => {
        onFetchUser({
          login: user.login,
          avatar_url: user.avatar_url,
          created_at: user.created_at,
          name: user.name,
          bio: user.bio,
          email: user.email,
          location: user.location,
          blog: user.blog,
          company: user.company,
          html_url: user.html_url,
          public_repos: user.public_repos,
          followers: user.followers,
          following: user.following,
        });
      })
      .catch((error: ResponseError) => {
        let errorMsg = '';

        switch (error.code) {
          case 403:
            errorMsg = ErrorMsg.MAX;
            break;
          case 404:
          default:
            errorMsg = ErrorMsg.NO_USER;
            break;
        }

        setIsErrorToastOpen(true);
        setErrorMsg(errorMsg);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onChangeTheme = (event: ChangeEvent<HTMLInputElement>) =>
    changeTheme(event.target.checked ? 'light' : 'dark');

  return (
    <Root>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <GithubCorner />
      </Box>
      <Stack component="main" spacing={5} alignItems="center" justifyContent="center">
        <Typography variant="h1">Github</Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="h2">Finder</Typography>
          <IconWrapper>
            <GithubIcon />
          </IconWrapper>
        </Stack>
        <Finder onFetchUser={fetchUser} isLoading={isLoading} />
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body1" sx={{ opacity: isLightTheme ? 0.5 : 1 }}>
            Dark theme
          </Typography>
          <StyledSwitch {...label} checked={isLightTheme} onChange={onChangeTheme} />
          <Typography variant="body1" sx={{ opacity: isLightTheme ? 1 : 0.5 }}>
            Light theme
          </Typography>
        </Stack>
      </Stack>
      <Footer />
      <Toast
        isOpen={isErrorToastOpen}
        type="error"
        msg={errorMsg}
        onClose={() => setIsErrorToastOpen(false)}
      />
    </Root>
  );
};

export default HomePage;
