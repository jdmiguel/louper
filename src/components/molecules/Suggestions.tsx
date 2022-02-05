/* material-ui */
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

/* molecules */
import Card from '../molecules/Card';

/* types */
import { User } from '../../utils/types';

const SuggestionsWrapper = styled('div')({
  display: 'grid',
  gap: 12,
  gridTemplateColumns: 'repeat(3, 1fr)',
  height: 220,
  marginBottom: 30,
  maxWidth: '100%',
  padding: 20,
});

const MIN_ITEMS_TO_PAGINATE = 10;
const MAX_PAGES_ALLOWED = 50;

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
        color="primary"
        onChange={onPaginate}
        hidePrevButton
        hideNextButton
      />
    )}
  </Stack>
);

export default Suggestions;
