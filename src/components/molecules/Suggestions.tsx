/* material-ui */
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';

/* molecules */
import Card from '../molecules/Card';

/* types */
import { User } from '../../utils/types';

const SuggestionsWrapper = styled('div')({
  display: 'grid',
  gap: 14,
  gridTemplateColumns: 'repeat(2, 1fr)',
  maxWidth: '100%',
  padding: 20,
  '@media (min-width: 768px)': {
    gridTemplateColumns: 'repeat(3, 1fr)',
    height: 260,
  },
});

const MIN_ITEMS_TO_PAGINATE = 13;
const MAX_PAGES_ALLOWED = 50;

const StyledPaginationItem = styled(PaginationItem)(({ theme }) => ({
  '&.MuiPaginationItem-root': {
    color: theme.palette.primary.main,
    margin: 0,
  },
  '&.Mui-selected': {
    backgroundColor: 'transparent',
    color: theme.palette.text.secondary,
    cursor: 'default',
  },
  '&.MuiPaginationItem-ellipsis': {
    color: theme.palette.text.primary,
  },
  '&:hover': {
    '&.MuiPaginationItem-root': {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.light,
    },
    '&.Mui-selected': {
      backgroundColor: 'transparent',
      color: theme.palette.text.secondary,
      cursor: 'default',
    },
    '&.MuiPaginationItem-ellipsis': {
      backgroundColor: 'transparent',
      color: theme.palette.text.primary,
    },
  },
}));

type Props = {
  items: User[];
  totalItems: number;
  onPaginate: (event: React.ChangeEvent<unknown>, page: number) => void;
  onSelectUser: (userName: string) => void;
};

const Suggestions = ({ items, totalItems, onPaginate, onSelectUser }: Props) => (
  <Stack sx={{ alignItems: 'center' }}>
    <SuggestionsWrapper>
      {items.map((user) => (
        <Card key={user.id} data={user} size="SMALL" onClick={onSelectUser} />
      ))}
    </SuggestionsWrapper>
    {totalItems >= MIN_ITEMS_TO_PAGINATE && (
      <Pagination
        count={totalItems <= MAX_PAGES_ALLOWED ? totalItems : MAX_PAGES_ALLOWED}
        renderItem={(item) => <StyledPaginationItem {...item} />}
        onChange={onPaginate}
        hidePrevButton
        hideNextButton
      />
    )}
  </Stack>
);

export default Suggestions;
