/* material-ui */
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';
import FolderIcon from '@mui/icons-material/Folder';
import FollowingIcon from '@mui/icons-material/Visibility';
import FollowerIcon from '@mui/icons-material/Favorite';

const Repo = styled('div')(({ theme }) => ({
  border: `1px solid ${theme.palette.secondary.light}`,
  borderRadius: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: 20,
}));

const Title = styled('div')(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  '& path': { fill: theme.palette.secondary.main },
}));

const RepoIcon = styled(FolderIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '1.3rem',
  marginRight: 6,
  marginBottom: 2,
}));

const Topics = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: 14,
  marginBottom: 12,
});

const Topic = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderRadius: 4,
  color: theme.palette.secondary.light,
  padding: '4px 8px',
  marginBottom: 5,
  marginRight: 5,
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

const GithubIconWrapper = styled('div')(({ theme }) => ({
  marginRight: 6,
  '& svg': {
    width: 22,
    '& path': {
      fill: theme.palette.primary.main,
    },
  },
}));

const EmptyMsg = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: 8,
});

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

const StyledFollowingIcon = styled(FollowingIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '1.3rem',
  marginRight: 6,
  marginBottom: 2,
}));

const StyledFollowerIcon = styled(FollowerIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '1.3rem',
  marginRight: 6,
  marginBottom: 2,
}));

export {
  Repo,
  Title,
  RepoIcon,
  Topics,
  Topic,
  StyledLink,
  GithubIconWrapper,
  EmptyMsg,
  UserCard,
  UserCardContent,
  StyledFollowingIcon,
  StyledFollowerIcon
}