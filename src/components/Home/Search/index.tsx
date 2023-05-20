import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Logo from './Logo';
import Watermark from './Watermark/index';
import Finder from './Finder';
import Suggestions from './Suggestions';
import { useUser } from '@/contexts/UserContext';
import useSearchUsers from '@/hooks/useSearchUsers';
import { SUGGESTIONS_PER_PAGE, INTRO_TITLE, UNAVAILABLE_ITEMS } from '@/utils/literals';
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
    shouldDisplayMatchedUsers,
    onPaginateSearchUsers,
  } = useSearchUsers();

  const theme = useTheme();

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
      <StyledSuggestionsWrapper>
        {shouldDisplayMatchedUsers ? (
          <Suggestions
            items={matchedUsers.items}
            totalItems={Math.ceil(totalMatchedUsers / SUGGESTIONS_PER_PAGE)}
            withPagination={totalMatchedUsers > SUGGESTIONS_PER_PAGE}
            onPaginate={onPaginateSearchUsers}
            onClickSuggestion={handleClickSuggestion}
          />
        ) : (
          <StyledWatermarkWrapper>
            {searchUsersQuery.length > 2 && !matchedUsers.total_count ? (
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
