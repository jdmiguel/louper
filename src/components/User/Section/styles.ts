import { styled } from '@mui/material/styles';

export const StyledRoot = styled('section')({
  display: 'grid',
  gridGap: 20,
  paddingTop: 20,
  position: 'relative',
  '@media (min-width: 992px)': {
    gridTemplateColumns: 'repeat(2, 310px)',
  },
  '@media (min-width: 1200px)': {
    gridTemplateColumns: 'repeat(2, 420px)',
  },
});

export const StyledEmptyMsg = styled('div')({
  display: 'flex',
  marginTop: 8,
});

export const StyledLoaderWrapper = styled('div')({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  minHeight: 90,
  width: '100%',
});
