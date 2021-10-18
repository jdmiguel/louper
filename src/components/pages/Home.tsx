import { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';

/* material-ui */
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

/* atoms */
import Corner from '../atoms/GithubCorner';
import GithubIcon from '../atoms/GithubIcon';

/* molecules */
import Finder from '../molecules/Finder';
import Footer from '../molecules/Footer';

/* services */
import { getUserData } from '../../services/github';

/* utils */
import { errorLiterals } from '../../utils';

const { maximumRequest, unavailableUser } = errorLiterals;

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100vh',
});

const CornerWrapper = styled('header')({
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

const Subtitle = styled('div')({
  marginTop: '38px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '@media (min-width: 768px)': {
    marginTop: '48px',
  },
});

const IconWrapper = styled('div')(({ theme }) => ({
  '& svg': {
    width: 44,
    marginLeft: 12,
    '& path': {
      fill: theme.palette.info.main,
    },
    '@media (min-width: 768px)': {
      width: 64,
      marginLeft: 12,
    },
  },
}));

const StyledAlert = styled(MuiAlert)({
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

const Alert = forwardRef((props, ref) => <StyledAlert elevation={4} ref={ref} variant="filled" {...props} />)

const Home = ({ onFetchUser }: {onFetchUser: Function}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);

  const fetchUser = (userName: string) => {
    setIsLoading(true);

    getUserData(userName)
      .then((user: any) => {
        onFetchUser({
          login: user.login,
          avatarUrl: user.avatar_url,
          createdAt: user.created_at,
          name: user.name,
          bio: user.bio,
          email: user.email,
          location: user.location,
          url: user.url,
          blog: user.blog,
          company: user.company,
          htmlUrl: user.html_url,
          repos: user.public_repos,
          followers: user.followers,
          following: user.following,
        });
      })
      .catch((error: any) => {
        let errorMsg = '';

        switch (error.code) {
          case 403:
            errorMsg = maximumRequest;
            break;
          case 404:
          default:
            errorMsg = unavailableUser;
            break;
        }

        setIsErrorAlertOpen(true);
        setErrorMsg(errorMsg);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onClose = (_event: Event, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsErrorAlertOpen(false);
  };

  return (
    <Root>
      <CornerWrapper>
        <Corner />
      </CornerWrapper>
      <main>
      <HomeHeading>
    <Typography variant="h1">Github</Typography>
    <Subtitle>
      <Typography variant="h2">Finder</Typography>
      <IconWrapper>
        <GithubIcon />
      </IconWrapper>
    </Subtitle>
  </HomeHeading>
        <Finder onFetchUser={fetchUser} isLoading={isLoading} />
      </main>
      <Footer />
      <Snackbar
        open={isErrorAlertOpen}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        autoHideDuration={3000}
        onClose={onClose}
      >
        <Alert onClose={onClose} severity="error">
          {errorMsg}
        </Alert>
      </Snackbar>
    </Root>
  );
};

Home.propTypes = {
  onFetchUser: PropTypes.func.isRequired,
};

export default Home;
