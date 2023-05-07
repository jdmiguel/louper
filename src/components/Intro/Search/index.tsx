import { useState, useEffect, useMemo, useCallback } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Logo from './Logo';
import Watermark from './Watermark/index';
import Finder from './Finder';
import Suggestions from './Suggestions';
import useWindowSize from '@/hooks/useWindowSize';
import { debounce } from '@/utils';
import { INTRO_TITLE } from '@/utils/literals';
import { API_BASE_URL, formatRequest } from '@/utils/request';
import { UsersData, UserData } from '@/utils/types';

const DEFAULT_USERS_DATA = {
  total_count: 0,
  items: [],
};
const MIN_CHARS_TO_SEARCH_USERS = 2;
const MAX_SUGGESTIONS_ALLOWED = 100;
const SUGGESTIONS_PER_PAGE = 9;

const Root = styled('div')(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  opacity: 0,
  animation: `${theme.animation.fadeIn} 1400ms 300ms forwards`,
  '@media (min-width: 1200px)': {
    minWidth: 600,
  },
  '@media (min-width: 1440px)': {
    marginRight: 60,
    minWidth: 620,
  },
}));

const LogoWrapper = styled('h1')({
  lineHeight: 0,
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
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  marginTop: 10,
  opacity: 0.15,
});

type Props = {
  onFetchUser: (userData: UserData) => void;
  onRequestError: (userLogin: string) => void;
};

const Search = ({ onFetchUser, onRequestError }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [areSuggestionsShown, setAreSuggestionsShown] = useState(false);
  const [usersData, setUsersData] = useState<UsersData>(DEFAULT_USERS_DATA);

  const { windowWidth } = useWindowSize();

  const abortControllerFetchUser = useMemo(() => new AbortController(), []);
  const abortControllerFetchUsers = useMemo(() => new AbortController(), []);

  const totalSuggestions = useMemo(
    () =>
      usersData.total_count <= MAX_SUGGESTIONS_ALLOWED
        ? usersData.total_count
        : MAX_SUGGESTIONS_ALLOWED,
    [usersData],
  );

  const theme = useTheme();

  useEffect(() => {
    return () => {
      abortControllerFetchUser.abort();
      abortControllerFetchUsers.abort();
    };
  }, [abortControllerFetchUser, abortControllerFetchUsers]);

  useEffect(() => {
    if (!windowWidth) {
      return;
    }
    setSearchQuery('');
    setAreSuggestionsShown(false);
  }, [windowWidth]);

  const fetchUsers = (searchQuery: string, page = 1) => {
    setIsLoadingUsers(true);

    fetch(
      `${API_BASE_URL}/search/users?q=${searchQuery}&page=${page}&per_page=${SUGGESTIONS_PER_PAGE}`,
      {
        signal: abortControllerFetchUsers.signal,
      },
    )
      .then(formatRequest)
      .then((fetchedUsersData: UsersData) => {
        setAreSuggestionsShown(!!fetchedUsersData.total_count);
        setUsersData(fetchedUsersData);
      })
      .catch((error) => {
        setAreSuggestionsShown(false);
        onRequestError(error.message);
      })
      .finally(() => {
        setIsLoadingUsers(false);
      });
  };

  const fetchUser = (userLogin: string) => {
    setIsLoadingUser(true);

    fetch(`${API_BASE_URL}/users/${userLogin}`, {
      signal: abortControllerFetchUser.signal,
    })
      .then(formatRequest)
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
        onRequestError(error.message);
      })
      .finally(() => {
        setIsLoadingUser(false);
      });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchUsers = useCallback(debounce(fetchUsers, 500), []);

  return (
    <Root data-testid="search">
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
        {INTRO_TITLE}
      </Typography>
      <Finder
        searchQuery={searchQuery}
        isLoadingUser={isLoadingUser}
        isLoadingUsers={isLoadingUsers}
        onChangeSearchQuery={(currentSearchQuery: string) => {
          setSearchQuery(currentSearchQuery);
          if (currentSearchQuery.length > MIN_CHARS_TO_SEARCH_USERS) {
            debouncedFetchUsers(currentSearchQuery);
          }
          if (currentSearchQuery.length <= MIN_CHARS_TO_SEARCH_USERS) {
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
            totalItems={Math.ceil(totalSuggestions / SUGGESTIONS_PER_PAGE)}
            withPagination={totalSuggestions > SUGGESTIONS_PER_PAGE}
            onPaginate={(page: number) => fetchUsers(searchQuery, page)}
            onSelectUser={(userName: string) => {
              setSearchQuery(userName);
              fetchUser(userName);
            }}
          />
        ) : (
          <WatermarkWrapper>
            {searchQuery.length > 2 && !usersData.total_count ? (
              <Typography
                variant="h6"
                sx={{
                  animation: `${theme.animation.fadeInUp} 250ms 650ms 1 ease-out forwards`,
                  color: 'neutral.light',
                  marginBottom: 2,
                  opacity: 0,
                  transform: 'translateY(20px)',
                }}
              >
                No matched users
              </Typography>
            ) : (
              <Watermark />
            )}
          </WatermarkWrapper>
        )}
      </SuggestionsWrapper>
    </Root>
  );
};

export default Search;
