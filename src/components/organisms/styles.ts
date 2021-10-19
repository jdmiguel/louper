/* material-ui */
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Icon from '@mui/material/Icon';
import WebIcon from '@mui/icons-material/Web';
import FolderIcon from '@mui/icons-material/Folder';
import FollowingIcon from '@mui/icons-material/Visibility';
import FollowerIcon from '@mui/icons-material/Favorite';

const GithubIconWrapper = styled('div')(({ theme }) => ({
  marginRight: 6,
  '& svg': {
    width: 22,
    '& path': {
      fill: theme.palette.primary.main,
    },
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.secondary.light}`,
  cursor: 'pointer',
  alignItems: 'center',
  display: 'flex',
  fontSize: '0.9rem',
  fontWeight: 700,
  paddingTop: 10,
  marginTop: 10,
  textDecoration: 'none',
  textTransform: 'uppercase',
  transition: 'color ease-out 250ms',
  '& path': { transition: 'fill ease-out 250ms' },
  '&:hover': {
    color: theme.palette.primary.light,
    '& path': { fill: theme.palette.primary.light },
  },
}));

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

const ProfileInfoTag = styled('div')(({ theme }) => ({
  alignItems: 'center',
  color: theme.palette.secondary.main,
  display: 'flex',
  justifyContent: 'center',
  marginRight: 12,
  marginBottom: 6,
  fontSize: '0.9rem',
}));

const ProfileIcon = styled(Icon)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: 22,
  marginRight: 3,
}));

const ProfileWebIcon = styled(WebIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '1.3rem',
  marginRight: 6,
  marginBottom: 2,
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

const CardTitle = styled('div')(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  '& path': { fill: theme.palette.secondary.main },
}));

const CardEmptyMsg = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: 8,
});

const RepoCard = styled('div')(({ theme }) => ({
  border: `1px solid ${theme.palette.secondary.light}`,
  borderRadius: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: 20,
}));

const RepoIcon = styled(FolderIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '1.3rem',
  marginRight: 6,
  marginBottom: 2,
}));

const RepoTopics = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: 14,
  marginBottom: 12,
});

const RepoTopic = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderRadius: 4,
  color: theme.palette.secondary.light,
  padding: '4px 8px',
  marginBottom: 5,
  marginRight: 5,
}));

const UserCard = styled('div')(({ theme }) => ({
  border: `1px solid ${theme.palette.secondary.light}`,
  borderRadius: 4,
  display: 'flex',
  padding: 20,
  '& img': {
    borderRadius: '50%',
    height: 80,
    marginRight: 12,
    width: 80,
  },
}));

const UserCardContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

const UserFollowingIcon = styled(FollowingIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '1.3rem',
  marginRight: 6,
  marginBottom: 2,
}));

const UserFollowerIcon = styled(FollowerIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '1.3rem',
  marginRight: 6,
  marginBottom: 2,
}));

export {
  GithubIconWrapper,
  StyledLink,
  ProfileRoot,
  ProfileContent,
  ProfileContentInfo,
  ProfileContentActions,
  ProfileInfoTag,
  ProfileIcon,
  ProfileWebIcon,
  ProfileMobileRoot,
  CardTitle,
  CardEmptyMsg,
  RepoCard,
  RepoIcon,
  RepoTopics,
  RepoTopic,
  UserCard,
  UserCardContent,
  UserFollowingIcon,
  UserFollowerIcon,
};
