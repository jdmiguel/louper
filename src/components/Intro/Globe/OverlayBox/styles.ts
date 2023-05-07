import { styled } from '@mui/material/styles';
import Icon from '@mui/material/Icon';

export const StyledRoot = styled('div')(({ theme }) => ({
  backdropFilter: 'blur(6px)',
  backgroundColor: theme.palette.overlay.main,
  borderRadius: 8,
  padding: 15,
  position: 'absolute',
  zIndex: 1,
}));

export const StyledOverlayBoxCountry = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  display: 'flex',
  marginBottom: 4,
}));

export const StyledOverlayBoxCountryIcon = styled(Icon)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 18,
  marginRight: 7,
}));

export const StyledOverlayBoxUsers = styled('div')(({ theme }) => ({
  color: theme.palette.text.secondary,
  display: 'flex',
}));

export const StyledOverlayBoxUsersIcon = styled(Icon)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: 18,
  marginRight: 7,
}));
