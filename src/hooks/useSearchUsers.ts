import { useState, useRef, useMemo, useCallback } from 'react';
import { useErrorMessage } from '@/contexts/ErrorMessageContext';
import { debounce } from '@/utils';
import { API_BASE_URL, formatRequest } from '@/utils/request';
import { Users } from '@/utils/types';
import {
  DEFAULT_USERS,
  MAX_SUGGESTIONS_ALLOWED,
  MIN_CHARS_TO_SEARCH_USERS,
  SUGGESTIONS_PER_PAGE,
} from '@/utils/literals';

const useSearchUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchUsersQuery, setSearchUsersQuery] = useState('');
  const [shouldDisplayMatchedUsers, setShouldDisplayMatchedUsers] = useState(false);
  const [matchedUsers, setMatchedUsers] = useState<Users>(DEFAULT_USERS);

  const shouldFetchUsers = useRef(false);

  const totalMatchedUsers = useMemo(
    () =>
      matchedUsers.total_count <= MAX_SUGGESTIONS_ALLOWED
        ? matchedUsers.total_count
        : MAX_SUGGESTIONS_ALLOWED,
    [matchedUsers],
  );

  const { displayErrorMessage, updateErrorMessage } = useErrorMessage();

  const fetchUsers = (query: string, page = 1) => {
    if (!shouldFetchUsers.current) return;

    setIsLoading(true);

    fetch(`${API_BASE_URL}/search/users?q=${query}&page=${page}&per_page=${SUGGESTIONS_PER_PAGE}`)
      .then(formatRequest)
      .then((fetchedUsersData: Users) => {
        setShouldDisplayMatchedUsers(!!fetchedUsersData.total_count);
        setMatchedUsers(fetchedUsersData);
      })
      .catch((error) => {
        setShouldDisplayMatchedUsers(false);
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
      setShouldDisplayMatchedUsers(false);
      setMatchedUsers(DEFAULT_USERS);
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
    matchedUsers,
    totalMatchedUsers,
    shouldDisplayMatchedUsers,
    onChangeSearchUsers,
    onPaginateSearchUsers,
    updateSearchUsersQuery,
  };
};

export default useSearchUsers;
