import { useState, useRef, useMemo, useCallback } from 'react';
import { useErrorMessage } from '@/contexts/ErrorMessageContext';
import { debounce } from '@/utils';
import { API_BASE_URL, formatRequest } from '@/utils/request';
import { Users, SimplifiedUser } from '@/utils/types';
import {
  DEFAULT_USERS,
  MAX_SUGGESTIONS_ALLOWED,
  MIN_CHARS_TO_SEARCH_USERS,
  SUGGESTIONS_PER_PAGE,
} from '@/utils/literals';

const useSearchUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [shouldDisplaySuggestions, setShouldDisplaySuggestions] = useState(false);
  const [searchUsersQuery, setSearchUsersQuery] = useState('');
  const [users, setUsers] = useState<Users>(DEFAULT_USERS);

  const shouldFetchUsers = useRef(false);

  const matchedUsers: SimplifiedUser[] = useMemo(
    () =>
      users.items.map((item) => ({
        id: item.id,
        login: item.login,
        html_url: item.html_url,
        avatar_url: item.avatar_url,
      })),
    [users],
  );
  const totalMatchedUsers = useMemo(
    () =>
      users.total_count <= MAX_SUGGESTIONS_ALLOWED ? users.total_count : MAX_SUGGESTIONS_ALLOWED,
    [users],
  );

  const { displayErrorMessage, updateErrorMessage } = useErrorMessage();

  const fetchUsers = (query: string, page = 1) => {
    if (!shouldFetchUsers.current) return;

    setIsLoading(true);

    fetch(`${API_BASE_URL}/search/users?q=${query}&page=${page}&per_page=${SUGGESTIONS_PER_PAGE}`)
      .then(formatRequest)
      .then((fetchedUsers: Users) => {
        setUsers(fetchedUsers);
        setShouldDisplaySuggestions(true);
      })
      .catch((error) => {
        displayErrorMessage();
        updateErrorMessage(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onChangeSearchUsers = (currentSearchQuery: string) => {
    setSearchUsersQuery(currentSearchQuery);
    if (currentSearchQuery.length > MIN_CHARS_TO_SEARCH_USERS) {
      shouldFetchUsers.current = true;
      debouncedFetchUsers(currentSearchQuery);
    }
    if (currentSearchQuery.length <= MIN_CHARS_TO_SEARCH_USERS) {
      shouldFetchUsers.current = false;
      setShouldDisplaySuggestions(false);
      setUsers(DEFAULT_USERS);
    }
  };

  const onPaginateSearchUsers = (page: number) => {
    shouldFetchUsers.current = true;
    fetchUsers(searchUsersQuery, page);
  };

  const updateSearchUsersQuery = (query: string) => setSearchUsersQuery(query);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchUsers = useCallback(debounce(fetchUsers, 500), []);

  return {
    isLoading,
    searchUsersQuery,
    shouldDisplaySuggestions,
    matchedUsers,
    totalMatchedUsers,
    onChangeSearchUsers,
    onPaginateSearchUsers,
    updateSearchUsersQuery,
  };
};

export default useSearchUsers;
