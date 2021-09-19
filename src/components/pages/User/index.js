import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/* material-ui */
import { makeStyles } from '@material-ui/core/styles';

/* organisms */
import Profile from '../../organisms/Profile';
import Repos from '../../organisms/Repos';
import Followers from '../../organisms/Followers';
import Following from '../../organisms/Following';

/* molecules */
import Menu from '../../molecules/Menu';

/* utils */
import { dataModel } from '../../../utils/models';

const useStyles = makeStyles({
  wrapper: {
    minHeight: '100vh',
    paddingBottom: 50,
  },
});

const User = ({ data, onBackFinder }) => {
  const classes = useStyles();

  const [activeSection, setActiveSection] = useState(0);
  const [repos, setRepos] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    if (activeSection !== 4) {
      return;
    }
    onBackFinder();
  }, [activeSection]);

  return (
    <div className={classes.wrapper}>
      <Menu
        data-test="user-menu"
        onClick={(section) => setActiveSection(section)}
        withRepos={!!data.repos}
        withFollowing={!!data.following}
        withFollowers={!!data.followers}
      />
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
    </div>
  );
};

User.propTypes = {
  data: dataModel,
  onBackFinder: PropTypes.func.isRequired,
};

export default User;
