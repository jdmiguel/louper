import { useState, useEffect, useMemo, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Corner from './Corner';
import Logo from './Logo';
import Watermark from './Watermark';
import Finder from './Finder';
import Suggestions from './Suggestions';
import Footer from '../shared/Footer';
import Toast from '../shared/Toast';
import InteractiveGlobe from './Globe/Globe';
import useWindowSize from '../../hooks/useWindowSize';
import { debounce } from '../../utils';
import { BASE_URL, handleErrors } from '../../utils/request';
import { User, UserData } from '../../utils/types';

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  position: 'relative',
  '@media (min-width: 768px)': {
    justifyContent: 'center',
  },
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
  marginBottom: 20,
  '@media (min-width: 768px)': {
    marginBottom: 50,
  },
  '@media (min-width: 992px)': {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 0,
  },
  '@media (min-width: 1440px)': {
    justifyContent: 'center',
  },
});

const Content = styled('div')({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 40,
  '@media (min-width: 768px)': {
    marginBottom: 60,
  },
  '@media (min-width: 992px)': {
    marginBottom: 0,
  },
  '@media (min-width: 1200px)': {
    minWidth: 600,
  },
  '@media (min-width: 1440px)': {
    marginRight: 60,
    minWidth: 620,
  },
});

const LogoWrapper = styled('h1')({
  lineHeight: 0,
  marginTop: 60,
  transform: 'scale(0.9)',
  '@media (min-width: 768px)': {
    transform: 'scale(1)',
  },
  '@media (min-width: 992px)': {
    marginTop: 0,
  },
});

const SuggestionsWrapper = styled('div')({
  height: 260,
  marginTop: 20,
});

const WatermarkWrapper = styled('div')({
  marginTop: 10,
  opacity: 0.15,
});

const DEFAULT_USERS_DATA = {
  total_count: 0,
  items: [],
};

enum DefaultValues {
  MinCharsToSearchUsers = 2,
  MaxSuggestionsAllowed = 100,
  SuggestionsPerPage = 12,
}

type UsersData = {
  total_count: number;
  items: User[] | [];
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
  const [errorMessage, setErrorMessage] = useState('');

  const { windowWidth } = useWindowSize();
  const isSmallDevice = windowWidth <= 1200;
  const suggestionsPerPage = isSmallDevice ? 8 : 12;

  const abortControllerFetchUser = useMemo(() => new AbortController(), []);
  const abortControllerFetchUsers = useMemo(() => new AbortController(), []);

  const totalSuggestions = useMemo(
    () =>
      usersData.total_count <= DefaultValues.MaxSuggestionsAllowed
        ? usersData.total_count
        : DefaultValues.MaxSuggestionsAllowed,
    [usersData],
  );

  useEffect(() => {
    return () => {
      abortControllerFetchUser.abort();
      abortControllerFetchUsers.abort();
    };
  }, [abortControllerFetchUser, abortControllerFetchUsers]);

  useEffect(() => {
    setSearchQuery('');
    setAreSuggestionsShown(false);
  }, [windowWidth]);

  const fetchUsers = (searchQuery: string, page?: number) => {
    setIsLoadingUsers(true);

    const endpoint = page
      ? `${BASE_URL}/search/users?q=${searchQuery}&page=${page}&per_page=${suggestionsPerPage}`
      : `${BASE_URL}/search/users?q=${searchQuery}&per_page=${suggestionsPerPage}`;

    fetch(endpoint, {
      signal: abortControllerFetchUsers.signal,
    })
      .then(handleErrors)
      .then((fetchedUsersData: UsersData) => {
        setAreSuggestionsShown(true);
        setUsersData(fetchedUsersData);
      })
      .catch((error) => {
        setAreSuggestionsShown(false);
        setErrorMessage(error.message);
      })
      .finally(() => {
        setIsLoadingUsers(false);
      });
  };

  const fetchUser = (userLogin: string) => {
    setIsLoadingUser(true);

    fetch(`${BASE_URL}/users/${userLogin}`, { signal: abortControllerFetchUser.signal })
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
      .catch((error) => {
        setIsErrorToastOpen(true);
        setErrorMessage(error.message);
      })
      .finally(() => {
        setIsLoadingUser(false);
      });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchUsers = useCallback(debounce(fetchUsers, 500), [suggestionsPerPage]);

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
              lineHeight: 0,
            }}
          >
            Search and find any Github user!
          </Typography>
          <Finder
            isLoadingUser={isLoadingUser}
            isLoadingUsers={isLoadingUsers}
            searchQuery={searchQuery}
            onChangeSearchQuery={(currentSearchQuery: string) => {
              if (currentSearchQuery === searchQuery) {
                return;
              }

              setSearchQuery(currentSearchQuery);
              if (currentSearchQuery.length > DefaultValues.MinCharsToSearchUsers) {
                debouncedFetchUsers(currentSearchQuery);
              }
              if (currentSearchQuery.length <= DefaultValues.MinCharsToSearchUsers) {
                setAreSuggestionsShown(false);
                setUsersData(DEFAULT_USERS_DATA);
              }
            }}
            onFetchUser={fetchUser}
          />
          <SuggestionsWrapper>
            {areSuggestionsShown ? (
              <Suggestions
                items={usersData.items}
                totalItems={Math.ceil(totalSuggestions / DefaultValues.SuggestionsPerPage)}
                withPagination={totalSuggestions >= DefaultValues.SuggestionsPerPage}
                onPaginate={(page: number) => fetchUsers(searchQuery, page)}
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
        <InteractiveGlobe />
      </Main>
      <Footer />
      <Toast
        isOpen={isErrorToastOpen}
        msg={errorMessage}
        onClose={() => setIsErrorToastOpen(false)}
      />
    </Root>
  );
};

export default HomePage;
