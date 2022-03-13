import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import Suggestion from '../Suggestion';
import { User } from '../../../../utils/types';

const SuggestionsWrapper = styled('div')({
  alignContent: 'flex-start',
  display: 'grid',
  gap: 14,
  gridTemplateColumns: 'repeat(2, 1fr)',
  maxWidth: '100%',
  padding: 20,
  '@media (min-width: 1200px)': {
    gridTemplateColumns: 'repeat(3, 1fr)',
    height: 200,
  },
});

const StyledPaginationItem = styled(PaginationItem)(({ theme }) => ({
  '&.MuiPaginationItem-root': {
    color: theme.palette.primary.main,
    margin: 0,
    fontSize: '1rem',
  },
  '&.Mui-selected': {
    backgroundColor: 'transparent',
    color: theme.palette.neutral.light,
    cursor: 'default',
  },
  '&.MuiPaginationItem-ellipsis': {
    color: theme.palette.neutral.light,
  },
  '&:hover': {
    '&.MuiPaginationItem-root': {
      color: theme.palette.primary.light,
      backgroundColor: 'tranparent',
    },
    '&.Mui-selected': {
      backgroundColor: 'transparent',
      color: theme.palette.neutral.light,
      cursor: 'default',
    },
    '&.MuiPaginationItem-ellipsis': {
      backgroundColor: 'transparent',
      color: theme.palette.neutral.light,
    },
  },
}));

type Props = {
  items: User[];
  totalItems: number;
  withPagination: boolean;
  onPaginate: (page: number) => void;
  onSelectUser: (userName: string) => void;
};

const Suggestions = ({ items, totalItems, withPagination, onPaginate, onSelectUser }: Props) => (
  <Stack sx={{ alignItems: 'center' }}>
    <SuggestionsWrapper>
      {items.map((user) => (
        <Suggestion key={user.id} data={user} onClick={onSelectUser} />
      ))}
    </SuggestionsWrapper>
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
  </Stack>
);

export default Suggestions;
