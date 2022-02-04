import { useState, useEffect } from 'react';

/* material-ui */
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

/* atoms */
import Corner from '../atoms/Corner';
import Logo from '../atoms/Logo';

/* molecules */
import Finder from '../molecules/Finder';
import Suggestions from '../molecules/Suggestions';
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

const SuggestionsWrapper = styled('div')(({ theme }) => ({
  height: 220,
  marginTop: 50,
  backgroundColor: theme.palette.primary.light,
}));

const abortController = new AbortController();

type Props = {
  onFetchUser: (user: User) => void;
  changeTheme: (themeMode: ThemeMode) => void;
};

const HomePage = ({ onFetchUser, changeTheme }: Props) => {
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [areSuggestionsShown, setAreSuggestionsShown] = useState(false);
  const [totalSuggestions, setTotalSuggestions] = useState(0);
  const [isErrorToastOpen, setIsErrorToastOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    return () => {
      abortController.abort();
    };
  }, []);

  const fetchUsers = (querySearch: string) => {
    setAreSuggestionsShown(true);
    setIsLoadingUsers(true);

    fetch(`${BASE_URL}/search/users?q=${querySearch}&per_page=9`, {
      signal: abortController.signal,
    })
      .then(handleErrors)
      .then((users: any) => {
        setUsers(users.items);
        setTotalSuggestions(users.total_count);
      })
      .catch((error: ResponseError) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoadingUsers(false);
      });
  };

  const fetchUser = (userName: string) => {
    setIsLoadingUser(true);

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
        setIsLoadingUser(false);
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
        <Finder
          isLoadingUser={isLoadingUser}
          isLoadingUsers={isLoadingUsers}
          onFetchUsers={fetchUsers}
          onFetchUser={fetchUser}
        />
        <SuggestionsWrapper>
          {areSuggestionsShown && (
            <Suggestions
              items={users}
              totalItems={totalSuggestions}
              onPaginate={(event: React.ChangeEvent<unknown>, page: number) => {
                console.log({ event });
                console.log({ page });
              }}
            />
          )}
        </SuggestionsWrapper>
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
