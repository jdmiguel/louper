import { styled } from '@mui/material/styles';

export const StyledRoot = styled('main')({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 240,
  position: 'sticky',
  top: 60,
});

export const StyledAvatarWrapper = styled('div')({
  height: 240,
  position: 'relative',
  width: 240,
});

export const StyledContent = styled('div')({
  marginTop: 30,
  maxWidth: 300,
  overflow: 'hidden',
});

export const StyledHeadings = styled('div')({
  marginBottom: 24,
});

export const StyledDetails = styled('div')(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.secondary.light}`,
  borderTop: `1px solid ${theme.palette.secondary.light}`,
  display: 'flex',
  flexWrap: 'wrap',
  marginBottom: 24,
  paddingBottom: 10,
  paddingTop: 10,
}));

export const StyledTextTagWrapper = styled('div')({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  marginRight: 12,
  marginBottom: 6,
  fontSize: '0.9rem',
});

export const StyledAction = styled('div')({
  marginBottom: 5,
});
