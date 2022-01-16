import { useState, useEffect, useMemo } from 'react';

/* material-ui */
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/* atoms */
import Corner from '../atoms/Corner';
import Logo from '../atoms/Logo';
import Watermark from '../atoms/Watermark';

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
  height: '100vh',
  backgroundImage: 'url("/bg.svg")',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'contain',
  backgroundBlendMode: 'color',
});

const Main = styled('main')({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
});

const Suggestions = styled('div')({
  marginTop: 50,
  maxWidth: '100%',
  padding: 20,
  display: 'none',
});

type Props = {
  onFetchUser: (user: User) => void;
  changeTheme: (themeMode: ThemeMode) => void;
};

const HomePage = ({ onFetchUser, changeTheme }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorToastOpen, setIsErrorToastOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const abortController = useMemo(() => new AbortController(), []);

  useEffect(() => {
    return () => {
      abortController.abort();
    };
  }, [abortController]);

  const fetchUsers = (chars: string) => {
    fetch(`${BASE_URL}/search/users?q=${chars}&per_page=10`, { signal: abortController.signal })
      .then(handleErrors)
      .then((users: any) => {
        console.log(users);
      })
      .catch((error: ResponseError) => {
        console.log(error);
      });
  };

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

  return (
    <Root>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Corner />
      </Box>
      <Main>
        <Logo />
        <Typography
          variant="h2"
          sx={{
            marginBottom: '60px',
          }}
        >
          Search and find any Github user!
        </Typography>
        <Finder isLoading={isLoading} onFetchUsers={fetchUsers} onFetchUser={fetchUser} />
        <Suggestions>
          <Watermark />
        </Suggestions>
      </Main>
      <Footer changeTheme={changeTheme} />
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
