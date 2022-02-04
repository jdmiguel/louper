/* material-ui */
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

/* molecules */
import Card from '../molecules/Card';

const SuggestionsWrapper = styled('div')({
  display: 'grid',
  gap: 12,
  gridTemplateColumns: 'repeat(3, 1fr)',
  height: 220,
  maxWidth: '100%',
  padding: 20,
});

type Props = {
  items: any[];
  totalItems: number;
  onPaginate: (event: React.ChangeEvent<unknown>, page: number) => void;
};

const Suggestions = ({ items, totalItems, onPaginate }: Props) => (
  <Stack sx={{ alignItems: 'center' }}>
    <SuggestionsWrapper>
      {items.map((user: any) => (
        <Card key={user.id} data={user} size="SMALL" />
      ))}
    </SuggestionsWrapper>
    <Pagination count={totalItems} color="primary" onChange={onPaginate} />
  </Stack>
);

export default Suggestions;
