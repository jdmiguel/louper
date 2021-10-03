import { useState } from 'react';
import PropTypes from 'prop-types';

/* material-ui */
import { styled } from '@mui/material/styles';

/* organisms */
import Profile from '../../organisms/Profile';
import Repos from '../../organisms/Repos';
import Followers from '../../organisms/Followers';
import Following from '../../organisms/Following';

/* utils */
import { dataModel } from '../../../utils/models';

const Root = styled('main')({
  display: 'flex',
  flexDirection: 'column',
});

const User = ({ data, activeSection }) => {
  const [repos, setRepos] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);

  return (
    <Root>
      {activeSection === 0 && <Profile data-test="user-profile" data={data} />}
      {activeSection === 1 && (
        <Repos
          data-test="user-repos"
          user={data.login}
          onFetchRepos={(repos) => setRepos(repos)}
          repos={repos}
        />
      )}
      {activeSection === 2 && (
        <Following
          data-test="user-following"
          user={data.login}
          onFetchFollowing={(following) => setFollowing(following)}
          following={following}
        />
      )}
      {activeSection === 3 && (
        <Followers
          data-test="user-followers"
          user={data.login}
          onFetchFollowers={(followers) => setFollowers(followers)}
          followers={followers}
        />
      )}
    </Root>
  );
};

User.propTypes = {
  data: dataModel,
  activeSection: PropTypes.number,
};

export default User;
