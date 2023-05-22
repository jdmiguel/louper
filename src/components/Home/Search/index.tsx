import Typography from '@mui/material/Typography';
import Logo from './Logo';
import Watermark from './Watermark/index';
import Finder from './Finder';
import Suggestions from './Suggestions';
import { useUser } from '@/contexts/UserContext';
import useSearchUsers from '@/hooks/useSearchUsers';
import {
  SUGGESTIONS_PER_PAGE,
  MIN_CHARS_TO_SEARCH_USERS,
  INTRO_TITLE,
  UNAVAILABLE_ITEMS,
} from '@/utils/literals';
import {
  StyledRoot,
  StyledHeader,
  StyledLogoWrapper,
  StyledSuggestionsWrapper,
  StyledWatermarkWrapper,
} from './styles';

const Search = () => {
  const { isLoading: isLoadingUser, fetchUser } = useUser();
  const {
    isLoading: isLoadingUsers,
    searchUsersQuery,
    onChangeSearchUsers,
    updateSearchUsersQuery,
    matchedUsers,
    totalMatchedUsers,
    shouldDisplaySuggestions,
    onPaginateSearchUsers,
  } = useSearchUsers();

  const handleFetchUser = (userName: string) => fetchUser(userName);

  const handleClickSuggestion = (userName: string) => {
    updateSearchUsersQuery(userName);
    handleFetchUser(userName);
  };

  return (
    <StyledRoot data-testid="search">
      <StyledHeader>
        <StyledLogoWrapper>
          <Logo />
        </StyledLogoWrapper>
        <Typography variant="h2">{INTRO_TITLE}</Typography>
      </StyledHeader>
      <Finder
        searchQuery={searchUsersQuery}
        isLoadingUser={isLoadingUser}
        isLoadingUsers={isLoadingUsers}
        onChangeSearchQuery={onChangeSearchUsers}
        onFetchUser={handleFetchUser}
      />
      {searchUsersQuery.length > MIN_CHARS_TO_SEARCH_USERS && shouldDisplaySuggestions ? (
        <StyledSuggestionsWrapper>
          {totalMatchedUsers > 0 ? (
            <Suggestions
              items={matchedUsers}
              totalItems={Math.ceil(totalMatchedUsers / SUGGESTIONS_PER_PAGE)}
              withPagination={totalMatchedUsers > SUGGESTIONS_PER_PAGE}
              onPaginate={onPaginateSearchUsers}
              onClickSuggestion={handleClickSuggestion}
            />
          ) : (
            <Typography
              variant="body1"
              sx={{
                color: 'neutral.main',
                marginTop: 2,
              }}
            >
              {UNAVAILABLE_ITEMS.users}
            </Typography>
          )}
        </StyledSuggestionsWrapper>
      ) : (
        <StyledWatermarkWrapper>
          <Watermark />
        </StyledWatermarkWrapper>
      )}
    </StyledRoot>
  );
};

export default Search;
