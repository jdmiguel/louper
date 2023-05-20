import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Logo from './Logo';
import Watermark from './Watermark/index';
import Finder from './Finder';
import Suggestions from './Suggestions';
import { useUser } from '@/contexts/UserContext';
import { debounce } from '@/utils';
import {
  DEFAULT_USERS,
  MAX_SUGGESTIONS_ALLOWED,
  SUGGESTIONS_PER_PAGE,
  MIN_CHARS_TO_SEARCH_USERS,
  INTRO_TITLE,
  UNAVAILABLE_ITEMS,
} from '@/utils/literals';
import { API_BASE_URL, formatRequest } from '@/utils/request';
import { Users } from '@/utils/types';
import {
  StyledRoot,
  StyledHeader,
  StyledLogoWrapper,
  StyledSuggestionsWrapper,
  StyledWatermarkWrapper,
} from './styles';

type Props = {
  onRequestError: (userName: string) => void;
};

const Search = ({ onRequestError }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [areSuggestionsShown, setAreSuggestionsShown] = useState(false);
  const [users, setUsers] = useState<Users>(DEFAULT_USERS);

  const shouldFetchUsers = useRef(false);

  const { isLoading: isLoadingUser, fetchUser } = useUser();

  const abortControllerFetchUsers = useMemo(() => new AbortController(), []);

  const totalSuggestions = useMemo(
    () =>
      users.total_count <= MAX_SUGGESTIONS_ALLOWED ? users.total_count : MAX_SUGGESTIONS_ALLOWED,
    [users],
  );

  const theme = useTheme();

  useEffect(() => {
    return () => {
      abortControllerFetchUsers.abort();
    };
  }, [abortControllerFetchUsers]);

  const fetchUsers = (searchQuery: string, page = 1) => {
    if (!shouldFetchUsers.current) return;

    setIsLoadingUsers(true);

    fetch(
      `${API_BASE_URL}/search/users?q=${searchQuery}&page=${page}&per_page=${SUGGESTIONS_PER_PAGE}`,
      {
        signal: abortControllerFetchUsers.signal,
      },
    )
      .then(formatRequest)
      .then((fetchedUsersData: Users) => {
        setAreSuggestionsShown(!!fetchedUsersData.total_count);
        setUsers(fetchedUsersData);
      })
      .catch((error) => {
        setAreSuggestionsShown(false);
        onRequestError(error.message);
      })
      .finally(() => {
        setIsLoadingUsers(false);
      });
  };

  const handleChangeSearchQuery = (currentSearchQuery: string) => {
    setSearchQuery(currentSearchQuery);
    if (currentSearchQuery.length > MIN_CHARS_TO_SEARCH_USERS) {
      shouldFetchUsers.current = true;
      debouncedFetchUsers(currentSearchQuery);
    }
    if (currentSearchQuery.length <= MIN_CHARS_TO_SEARCH_USERS) {
      shouldFetchUsers.current = false;
      setAreSuggestionsShown(false);
      setUsers(DEFAULT_USERS);
    }
  };

  const handleFetchUser = (userName: string) => fetchUser(userName, onRequestError);

  const handleSelectUser = (userName: string) => {
    setSearchQuery(userName);
    handleFetchUser(userName);
  };

  const handlePaginate = (page: number) => {
    shouldFetchUsers.current = true;
    fetchUsers(searchQuery, page);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchUsers = useCallback(debounce(fetchUsers, 500), []);

  return (
    <StyledRoot data-testid="search">
      <StyledHeader>
        <StyledLogoWrapper>
          <Logo />
        </StyledLogoWrapper>
        <Typography variant="h2">{INTRO_TITLE}</Typography>
      </StyledHeader>
      <Finder
        searchQuery={searchQuery}
        isLoadingUser={isLoadingUser}
        isLoadingUsers={isLoadingUsers}
        onChangeSearchQuery={handleChangeSearchQuery}
        onFetchUser={handleFetchUser}
      />
      <StyledSuggestionsWrapper>
        {areSuggestionsShown ? (
          <Suggestions
            items={users.items}
            totalItems={Math.ceil(totalSuggestions / SUGGESTIONS_PER_PAGE)}
            withPagination={totalSuggestions > SUGGESTIONS_PER_PAGE}
            onPaginate={handlePaginate}
            onSelectUser={handleSelectUser}
          />
        ) : (
          <StyledWatermarkWrapper>
            {searchQuery.length > 2 && !users.total_count ? (
              <Typography
                variant="h6"
                sx={{
                  animation: `${theme.animation.fadeInUp} 250ms 650ms ease-out forwards`,
                  color: 'neutral.light',
                  marginBottom: 2,
                  opacity: 0,
                  transform: 'translateY(20px)',
                }}
              >
                {UNAVAILABLE_ITEMS.users}
              </Typography>
            ) : (
              <Watermark />
            )}
          </StyledWatermarkWrapper>
        )}
      </StyledSuggestionsWrapper>
    </StyledRoot>
  );
};

export default Search;
