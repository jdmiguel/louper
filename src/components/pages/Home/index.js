import { useState } from 'react';
import PropTypes from 'prop-types';

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

const Home = ({ onFetchUser }) => {
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
    <div data-test="home">
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
