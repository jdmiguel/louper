import { useState, useEffect, useMemo, useCallback } from 'react';

/* material-ui */
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

/* atoms */
import Corner from '../atoms/Corner';
import Logo from '../atoms/Logo';
import Watermark from '../atoms/Watermark';

/* molecules */
import Finder from '../molecules/Finder';
import Suggestions from '../molecules/Suggestions';
import Footer from '../molecules/Footer';
import Toast from '../molecules/Toast';

/* organisms */
import InteractiveEarth from '../organisms/InteractiveEarth';
import Universe from '../organisms/Universe';

/* request */
import { ResponseError, BASE_URL, handleErrors } from '../../utils/request';

/* types */
import { UserData, UsersData } from '../../utils/types';

/* utils */
import { debounce } from '../../utils/index';

enum ErrorMsg {
  MAX = 'You have excedeed the maximum allowed request. Please, wait for a while',
  NO_USER = 'Please, choose an available user',
}

const MIN_CHARS_TO_SEARCH_USERS = 2;

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  justifyContent: 'center',
});

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
  justifyContent: 'center',
  '@media (min-width: 1200px)': {
    flexDirection: 'row',
  },
});

const Content = styled('div')({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  '@media (min-width: 1200px)': {
    marginRight: 60,
    minWidth: 620,
  },
});

const LogoWrapper = styled('h1')({
  transform: 'scale(0.9)',
  '@media (min-width: 768px)': {
    transform: 'scale(1)',
  },
});

const SuggestionsWrapper = styled('div')({
  height: 260,
  marginTop: 20,
});

const WatermarkWrapper = styled('div')({
  marginTop: 10,
});

const EarthWrapper = styled('div')({
  display: 'none',
  '@media (min-width: 1200px)': {
    display: 'block',
    height: 580,
    width: 580,
  },
});

const UniverseWrapper = styled('div')({
  display: 'none',
  '@media (min-width: 1200px)': {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
});

const DEFAULT_USERS_DATA = {
  total_count: 0,
  items: [],
};

type Props = {
  onFetchUser: (userData: UserData) => void;
};

const HomePage = ({ onFetchUser }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [areSuggestionsShown, setAreSuggestionsShown] = useState(false);
  const [isErrorToastOpen, setIsErrorToastOpen] = useState(false);
  const [usersData, setUsersData] = useState<UsersData>(DEFAULT_USERS_DATA);
  const [errorMsg, setErrorMsg] = useState('');

  const abortControllerFetchUser = useMemo(() => new AbortController(), []);
  const abortControllerFetchUsers = useMemo(() => new AbortController(), []);

  useEffect(() => {
    return () => {
      abortControllerFetchUser.abort();
      abortControllerFetchUsers.abort();
    };
  }, [abortControllerFetchUser, abortControllerFetchUsers]);

  const fetchUsers = (querySearch: string, page?: number) => {
    setIsLoadingUsers(true);

    const endpoint = page
      ? `${BASE_URL}/search/users?q=${querySearch}&page=${page}&per_page=12`
      : `${BASE_URL}/search/users?q=${querySearch}&per_page=12`;

    fetch(endpoint, {
      signal: abortControllerFetchUsers.signal,
    })
      .then(handleErrors)
      .then((fetchedUsersData: UsersData) => {
        setUsersData(fetchedUsersData);
        setAreSuggestionsShown(true);
      })
      .catch((error: ResponseError) => {
        setAreSuggestionsShown(false);
        console.log(error);
      })
      .finally(() => {
        setIsLoadingUsers(false);
      });
  };

  const fetchUser = (userName: string) => {
    setIsLoadingUser(true);

    fetch(`${BASE_URL}/users/${userName}`, { signal: abortControllerFetchUser.signal })
      .then(handleErrors)
      .then((userData: UserData) => {
        onFetchUser({
          login: userData.login,
          avatar_url: userData.avatar_url,
          created_at: userData.created_at,
          name: userData.name,
          bio: userData.bio,
          email: userData.email,
          location: userData.location,
          blog: userData.blog,
          company: userData.company,
          html_url: userData.html_url,
          public_repos: userData.public_repos,
          followers: userData.followers,
          following: userData.following,
        });
      })
      .catch((error: ResponseError) => {
        let errorMsg = '';

        console.log({ error });

        switch (error.status) {
          case 403:
          default:
            errorMsg = ErrorMsg.MAX;
            break;
          case 404:
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFunction = useCallback(debounce(fetchUsers, 500), []);

  const onChangeSearchQuery = (currentSearchQuery: string) => {
    if (currentSearchQuery === searchQuery) {
      return;
    }

    setSearchQuery(currentSearchQuery);
    if (currentSearchQuery.length > MIN_CHARS_TO_SEARCH_USERS) {
      debouncedFunction(currentSearchQuery);
    }
    if (currentSearchQuery.length <= MIN_CHARS_TO_SEARCH_USERS) {
      setAreSuggestionsShown(false);
      setUsersData(DEFAULT_USERS_DATA);
    }
  };

  return (
    <Root>
      <CornerWrapper>
        <Corner />
      </CornerWrapper>
      <Main>
        <Content>
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
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
            searchQuery={searchQuery}
            onChangeSearchQuery={onChangeSearchQuery}
            onFetchUser={fetchUser}
          />
          <SuggestionsWrapper>
            {areSuggestionsShown ? (
              <Suggestions
                items={usersData.items}
                totalItems={usersData.total_count}
                onPaginate={(_, page: number) => fetchUsers(searchQuery, page)}
                onSelectUser={(userName: string) => {
                  setSearchQuery(userName);
                  fetchUser(userName);
                }}
              />
            ) : (
              <WatermarkWrapper>
                <Watermark />
              </WatermarkWrapper>
            )}
          </SuggestionsWrapper>
        </Content>
        <EarthWrapper>
          <InteractiveEarth />
        </EarthWrapper>
        <UniverseWrapper>
          <Universe />
        </UniverseWrapper>
      </Main>
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
