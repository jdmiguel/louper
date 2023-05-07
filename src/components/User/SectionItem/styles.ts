import { styled } from '@mui/material/styles';

export const StyledRoot = styled('div')(({ theme }) => ({
  border: `1px solid ${theme.palette.secondary.light}`,
  borderRadius: 4,
  padding: 20,
  overflow: 'hidden',
}));

export const StyledTitle = styled('div')(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  marginBottom: 4,
  '& path': { fill: theme.palette.secondary.main },
}));

export const StyledAvatarWrapper = styled('div')({
  height: 80,
  marginRight: 20,
  position: 'relative',
  width: 80,
});

export const StyledTopic = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderRadius: 4,
  color: theme.palette.primary.contrastText,
  marginBottom: 5,
  marginRight: 5,
  padding: '4px 8px',
  opacity: 0.5,
}));

export const StyledAction = styled('div')(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.secondary.light}`,
  marginTop: 14,
  paddingTop: 10,
}));
