import { useSpring, easings, animated } from '@react-spring/web';
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import Suggestion from '../Suggestion';
import { User } from '@/utils/types';

const SuggestionsWrapper = styled('div')({
  alignContent: 'flex-start',
  display: 'grid',
  gap: 14,
  gridTemplateColumns: 'repeat(2, 1fr)',
  maxWidth: '100%',
  padding: 20,
  '@media (min-width: 768px)': {
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
    color: theme.palette.neutral.main,
    cursor: 'default',
  },
  '&.MuiPaginationItem-ellipsis': {
    color: theme.palette.neutral.main,
  },
  '&:hover': {
    '&.MuiPaginationItem-root': {
      color: theme.palette.primary.main,
      backgroundColor: 'tranparent',
    },
    '&.Mui-selected': {
      backgroundColor: 'transparent',
      color: theme.palette.neutral.main,
      cursor: 'default',
    },
    '&.MuiPaginationItem-ellipsis': {
      backgroundColor: 'transparent',
      color: theme.palette.neutral.main,
    },
  },
}));

const AnimatedStack = animated(Stack);

type Props = {
  items: User[];
  totalItems: number;
  withPagination: boolean;
  onPaginate: (page: number) => void;
  onSelectUser: (userName: string) => void;
};

const Suggestions = ({ items, totalItems, withPagination, onPaginate, onSelectUser }: Props) => {
  const entrySuggestions = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      duration: 200,
    },
  });

  return (
    <AnimatedStack sx={{ alignItems: 'center' }} style={entrySuggestions}>
      <SuggestionsWrapper role="grid">
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
    </AnimatedStack>
  );
};

export default Suggestions;
