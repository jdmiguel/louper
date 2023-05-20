import { styled } from '@mui/material/styles';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';

export const StyledRoot = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  opacity: 0,
  animation: `${theme.animation.fadeIn} 200ms forwards`,
}));

export const StyledSuggestionsWrapper = styled('div')({
  alignContent: 'flex-start',
  display: 'grid',
  gap: 10,
  gridTemplateColumns: 'repeat(2, 1fr)',
  maxWidth: '100%',
  padding: '20px 0',
});

export const StyledPaginationItem = styled(PaginationItem)(({ theme }) => ({
  '&.MuiPaginationItem-root': {
    color: theme.palette.primary.main,
    margin: 0,
    fontSize: '1rem',
  },
  '&.Mui-selected': {
    backgroundColor: 'transparent',
    color: theme.palette.text.secondary,
    cursor: 'default',
  },
  '&.MuiPaginationItem-ellipsis': {
    color: theme.palette.text.secondary,
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
