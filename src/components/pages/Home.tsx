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
import InteractiveGlobe from '../organisms/InteractiveGlobe';

/* hooks */
import useWindowSize from '../../hooks/useWindowSize';

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
  '@media (min-width: 768px)': {
    justifyContent: 'center',
    height: '100vh',
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
  '@media (min-width: 992px)': {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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
    marginTop: 0,
    transform: 'scale(1)',
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

const GlobeWrapper = styled('div')({
  height: 320,
  position: 'relative',
  width: 320,
  '@media (min-width: 375px)': {
    height: 350,
    width: 350,
  },
  '@media (min-width: 768px)': {
    height: 450,
    width: 450,
  },
  '@media (min-width: 1200px)': {
    height: 510,
    width: 510,
  },
  '@media (min-width: 1440px)': {
    height: 580,
    width: 580,
  },
});

const Banner = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  color: theme.palette.secondary.light,
  height: 100,
  position: 'absolute',
  width: 220,
  zIndex: 1,
}));

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
  const [isMarkerHovered, setIsMarkerHovered] = useState(false);
  const [bannerPositions, setBannerPositions] = useState<any>({ x: 0, y: 0 });

  const { windowWidth } = useWindowSize();
  const isSmallDevice = windowWidth <= 1200;
  const suggestionsPerPage = isSmallDevice ? 8 : 12;

  const abortControllerFetchUser = useMemo(() => new AbortController(), []);
  const abortControllerFetchUsers = useMemo(() => new AbortController(), []);

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

  const fetchUsers = (querySearch: string, page?: number) => {
    setIsLoadingUsers(true);

    const endpoint = page
      ? `${BASE_URL}/search/users?q=${querySearch}&page=${page}&per_page=${suggestionsPerPage}`
      : `${BASE_URL}/search/users?q=${querySearch}&per_page=${suggestionsPerPage}`;

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
  const debouncedFunction = useCallback(debounce(fetchUsers, 500), [suggestionsPerPage]);

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
              lineHeight: 0,
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
        <GlobeWrapper
          sx={{
            cursor: isMarkerHovered ? 'pointer' : 'default',
          }}
        >
          <InteractiveGlobe
            onMarkerOver={(currentBannerPositions: any) => {
              setBannerPositions(currentBannerPositions);
              setIsMarkerHovered(true);
            }}
            onMarkerOut={() => {
              setIsMarkerHovered(false);
            }}
          />
          {isMarkerHovered && (
            <Banner
              sx={{
                left: `${bannerPositions.x - 100}px`,
                top: `${bannerPositions.y + 20}px`,
              }}
            >
              Text description
            </Banner>
          )}
        </GlobeWrapper>
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
