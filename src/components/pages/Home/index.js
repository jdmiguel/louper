import { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';

/* material-ui */
import { styled } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

/* molecules */
import Finder from '../../molecules/Finder';
import Heading from '../../molecules/Heading';
import Footer from '../../molecules/Footer';

/* atoms */
import Corner from '../../atoms/Corner';

/* services */
import { getUserData } from '../../../services/github';

/* utils */
import { errorLiterals } from '../../../utils';

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

const Alert = forwardRef(function Alert(props, ref) {
  return <StyledAlert elevation={4} ref={ref} variant="filled" {...props} />;
});

const Home = ({ onFetchUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isErrorAlertOpen, setIsErrorAlertOpen] = useState(false);

  const fetchUser = (userName) => {
    setIsLoading(true);

    getUserData(userName)
      .then((user) => {
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
      .catch((error) => {
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

  const onClose = (event, reason) => {
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
        <Heading />
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
