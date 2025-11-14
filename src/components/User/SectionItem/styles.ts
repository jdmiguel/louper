import { styled } from '@mui/material/styles';

export const StyledRoot = styled('a')(({ theme }) => ({
  border: `1px solid ${theme.palette.secondary.light}`,
  borderRadius: 4,
  padding: 20,
  overflow: 'hidden',
  textDecoration: 'none',
  transition: 'background-color ease-out 250ms',
  '&:hover': {
    backgroundColor: theme.palette.overlay.dark,
  },
}));

export const StyledTitle = styled('div')(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  marginBottom: 4,
  '& path': { fill: theme.palette.secondary.main },
}));

export const StyledAvatarWrapper = styled('div')({
  height: 60,
  marginRight: 20,
  position: 'relative',
  width: 60,
});
