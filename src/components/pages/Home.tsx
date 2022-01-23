import { useState, useEffect, useCallback } from 'react';

/* material-ui */
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

/* atoms */
import Corner from '../atoms/Corner';
import Logo from '../atoms/Logo';

/* molecules */
import Finder from '../molecules/Finder';
import Card from '../molecules/Card';
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

const Root = styled('div')(({ theme }) => ({
  backgroundImage: `${
    theme.palette.mode === 'light' ? "url('/white_bg.svg')" : "url('/black_bg.svg')"
  }`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'contain',
  backgroundBlendMode: 'color',
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  justifyContent: 'center',
}));

const CornerWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  position: 'absolute',
  top: 0,
  width: '100%',
});

const Main = styled('main')({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
});

const Suggestions = styled('div')({
  display: 'grid',
  gap: 12,
  gridTemplateColumns: 'repeat(4, 1fr)',
  height: 220,
  marginTop: 50,
  maxWidth: '100%',
  padding: 20,
});

const abortController = new AbortController();

type Props = {
  onFetchUser: (user: User) => void;
  changeTheme: (themeMode: ThemeMode) => void;
};

const HomePage = ({ onFetchUser, changeTheme }: Props) => {
  const [isFetchingUser, setIsFetchingUser] = useState(false);
  const [isFetchingUsers, setIsFetchingUsers] = useState(false);
  const [isErrorToastOpen, setIsErrorToastOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    return () => {
      abortController.abort();
    };
  }, []);

  const fetchUsers = useCallback((querySearch: string) => {
    setIsFetchingUsers(true);

    fetch(`${BASE_URL}/search/users?q=${querySearch}&per_page=10`, {
      signal: abortController.signal,
    })
      .then(handleErrors)
      .then((users: any) => {
        setUsers(users.items);
        console.log(users);
      })
      .catch((error: ResponseError) => {
        console.log(error);
      })
      .finally(() => {
        setIsFetchingUsers(false);
      });
  }, []);

  const fetchUser = (userName: string) => {
    setIsFetchingUser(true);

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
        setIsFetchingUser(false);
      });
  };

  return (
    <Root>
      <CornerWrapper>
        <Corner />
      </CornerWrapper>
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
        <Finder isLoading={isFetchingUser} onFetchUsers={fetchUsers} onFetchUser={fetchUser} />
        <Suggestions>
          {isFetchingUsers && <CircularProgress className="loaderIcon" size={40} thickness={5} />}
          {users.map((user: any) => (
            <Card key={user.id} theme="FOLLOWING" data={user} size="SMALL" />
          ))}
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
