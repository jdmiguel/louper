import Pagination from '@mui/material/Pagination';
import Suggestion from '../Suggestion';
import { BasicUser } from '@/utils/types';
import { StyledRoot, StyledSuggestionsWrapper, StyledPaginationItem } from './styles';

type Props = {
  items: BasicUser[];
  totalItems: number;
  withPagination: boolean;
  onPaginate: (page: number) => void;
  onClickSuggestion: (userName: string) => void;
};

const Suggestions = ({
  items,
  totalItems,
  withPagination,
  onPaginate,
  onClickSuggestion,
}: Props) => (
  <StyledRoot>
    <StyledSuggestionsWrapper role="grid">
      {items.map((user) => (
        <Suggestion key={user.id} data={user} onClick={onClickSuggestion} />
      ))}
    </StyledSuggestionsWrapper>
    {withPagination && (
      <Pagination
        count={totalItems}
        renderItem={(item) => <StyledPaginationItem {...item} />}
        onChange={(_, page: number) => onPaginate(page)}
        hidePrevButton
        hideNextButton
        size="small"
      />
    )}
  </StyledRoot>
);

export default Suggestions;
