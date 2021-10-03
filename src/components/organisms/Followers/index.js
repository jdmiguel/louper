import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/* material-ui */
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';

/* core */
import Loader from '../../atoms/Loader';

/* services */
import { getFollowers } from '../../../services/github';

/* utils */
import { navigateToUrl } from '../../../utils';
import { followersModel } from '../../../utils/models';

/* styles */
import './styles.css';

const Followers = ({ followers: followersData, user, onFetchFollowers }) => {
  const [followers, setFollowers] = useState(followersData);

  useEffect(() => {
    if (followersData.length > 0) {
      return;
    }

    getFollowers(user)
      .then((followers) => {
        setFollowers(followers);
        onFetchFollowers(followers);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  if (followers.length === 0) {
    return <Loader data-test="followers-loader" />;
  }

  return (
    <Grid data-test="followers" container className="followers" spacing={16}>
      {followers.map((follower) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={follower.id}>
          <div className="follower__content">
            <div className="follower__data">
              <h3 data-test="follower-name">{follower.login}</h3>
              <Button
                data-test="follower-btn"
                onClick={() => navigateToUrl(follower.html_url, '_blank')}
                color="primary"
                variant="contained"
                disabled={false}
                endIcon={<Icon>account_circle</Icon>}
              >
                VISIT GITHUB USER
              </Button>
            </div>
            <img
              data-test="follower-image"
              alt="user follower avatar"
              src={follower.avatar_url}
            />
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

Followers.propTypes = {
  followers: followersModel,
  user: PropTypes.string,
  onFetchFollowers: PropTypes.func,
};

export default Followers;
