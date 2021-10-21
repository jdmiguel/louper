/* material-ui */
import { styled } from '@mui/material/styles';

const ProfileRoot = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 240,
  position: 'sticky',
  top: 60,
  '& img': {
    borderRadius: '50%',
    height: 220,
    width: 220,
    '@media (min-width: 1200px)': {
      height: 240,
      width: 240,
    },
  },
});

const ProfileContent = styled('div')({
  marginTop: 20,
  maxWidth: 300,
});

const ProfileContentInfo = styled('div')(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.secondary.light}`,
  borderTop: `1px solid ${theme.palette.secondary.light}`,
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: 24,
  paddingBottom: 10,
  paddingTop: 10,
}));

const ProfileContentActions = styled('div')({
  marginTop: 20,
});

const ProfileContentAction = styled('div')({
  marginBottom: 5,
});

const ProfileLabel = styled('div')(({ theme }) => ({
  alignItems: 'center',
  color: theme.palette.secondary.main,
  display: 'flex',
  justifyContent: 'center',
  marginRight: 12,
  marginBottom: 6,
  fontSize: '0.9rem',
}));

const ProfileMobileRoot = styled('div')({
  display: 'flex',
  marginTop: 20,
  '@media (min-width: 769px)': {
    display: 'none',
  },
  '& > img': {
    borderRadius: '50%',
    height: 100,
    marginRight: 20,
    width: 100,
  },
});

const EmptyMsg = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: 8,
});

export {
  ProfileRoot,
  ProfileContent,
  ProfileContentInfo,
  ProfileContentActions,
  ProfileContentAction,
  ProfileLabel,
  ProfileMobileRoot,
  EmptyMsg,
};
