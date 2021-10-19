/* material-ui */
import { styled } from '@mui/material/styles';
import MuiAlert from '@mui/material/Alert';

const HomeRoot = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100vh',
});

const HomeAlert = styled(MuiAlert)({
  '& .MuiAlert-icon': {
    padding: '9px 0',
  },
  '& .MuiAlert-message': {
    padding: '12px 0',
  },
  '& .MuiAlert-action': {
    svg: {
      height: '1.4rem',
      width: '1.4rem',
    },
  },
});

const HomeCorner = styled('header')({
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
});

const HomeHeading = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '50px',
});

const HomeSubtitle = styled('div')({
  marginTop: '38px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '@media (min-width: 768px)': {
    marginTop: '48px',
  },
});

const HomeIconWrapper = styled('div')(({ theme }) => ({
  '& svg': {
    width: 44,
    marginLeft: 12,
    '& path': {
      fill: theme.palette.neutral.main,
    },
    '@media (min-width: 768px)': {
      width: 64,
      marginLeft: 12,
    },
  },
}));

const UserRoot = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  padding: '0 20px 50px 0',
  '@media (min-width: 769px)': {
    padding: '0 40px 50px 0',
  },
});

const UserProfile = styled('aside')({
  margin: '60px 40px 0 0',
  '@media (max-width: 768px)': {
    display: 'none',
  },
});

const UserContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  '@media (max-width: 992px)': {
    width: '100%',
  },
});

const UserSection = styled('main')({
  display: 'grid',
  gridGap: 20,
  marginTop: 30,
  '@media (min-width: 992px)': {
    gridTemplateColumns: 'repeat(2, 300px)',
  },
  '@media (min-width: 1200px)': {
    gridTemplateColumns: 'repeat(2, 420px)',
  },
});

export {
  HomeRoot,
  HomeAlert,
  HomeCorner,
  HomeHeading,
  HomeSubtitle,
  HomeIconWrapper,
  UserRoot,
  UserProfile,
  UserContent,
  UserSection,
};
