import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

/* material-ui */
import { makeStyles } from '@material-ui/core/styles';

/* molecules */
import Finder from '../../molecules/Finder';
import Heading from '../../molecules/Heading';
import ErrorModal from '../../molecules/ErrorModal';

/* atoms */
import Corner from '../../atoms/Corner';

/* services */
import { getUserData } from '../../../services/github';

/* utils */
import { errorLiterals } from '../../../utils';

const { maximumRequest, unavailableUser } = errorLiterals;

const useStyles = makeStyles({
  wrapper: {
    textAlign: 'center',
    width: 'auto',
    height: '95vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '@media (min-width: 768px)': {
      height: '100vh',
    },
  },
});

const Home = ({ onFetchUser }) => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

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

        setIsErrorModalOpen(true);
        setErrorMsg(errorMsg);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div data-test="home" className={classes.wrapper}>
      <Corner data-test="home-corner" />
      <Heading data-test="home-heading" />
      <Finder
        data-test="home-finder"
        onFetchUser={fetchUser}
        isLoading={isLoading}
      />
      <ErrorModal
        data-test="home-errorModal"
        isErrorModalOpen={isErrorModalOpen}
        onClick={() => setIsErrorModalOpen(false)}
        msg={errorMsg}
      />
    </div>
  );
};

Home.propTypes = {
  onFetchUser: PropTypes.func.isRequired,
};

export default Home;
