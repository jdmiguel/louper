import { useState, useEffect, useMemo, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Logo from './Logo';
import Watermark from './Watermark/index';
import Finder from './Finder';
import Suggestions from './Suggestions';
import { debounce } from '../../../utils';
import { handleErrors } from '../../../utils/request';
import { User, UserData } from '../../../utils/types';

const Root = styled('div')({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 100,
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
  SuggestionsPerPage = 9,
}

type UsersData = {
  total_count: number;
  items: User[] | [];
};

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

  const fetchUsers = (searchQuery: string, page = 1) => {
    setIsLoadingUsers(true);

    fetch(
      `${process.env.REACT_APP_BASE_URL}/search/users?q=${searchQuery}&page=${page}&per_page=${DefaultValues.SuggestionsPerPage}`,
      {
        signal: abortControllerFetchUsers.signal,
      },
    )
      .then(handleErrors)
      .then((fetchedUsersData: UsersData) => {
        setAreSuggestionsShown(true);
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

    fetch(`${process.env.REACT_APP_BASE_URL}/users/${userLogin}`, {
      signal: abortControllerFetchUser.signal,
    })
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
        onRequestError(error.message);
      })
      .finally(() => {
        setIsLoadingUser(false);
      });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchUsers = useCallback(debounce(fetchUsers, 500), []);

  return (
    <Root>
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
            withPagination={totalSuggestions > DefaultValues.SuggestionsPerPage}
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
    </Root>
  );
};

export default Search;
