import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/* material-ui */
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';

/* core */
import Loader from '../../atoms/Loader';

/* services */
import { getFollowings } from '../../../services/github';

/* utils */
import { navigateToUrl } from '../../../utils';
import { followingModel } from '../../../utils/models';

/* styles */
import './styles.css';

const Following = ({ following: followingData, user, onFetchFollowing }) => {
  const [following, setFollowing] = useState(followingData);

  useEffect(() => {
    if (followingData.length > 0) {
      return;
    }

    getFollowings(user)
      .then((fetchedFollowing) => {
        setFollowing(fetchedFollowing);
        onFetchFollowing(fetchedFollowing);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  if (following.length === 0) {
    return <Loader data-test="followings-loader" />;
  }

  return (
    <Grid data-test="following" container className="following" spacing={16}>
      {following.map((nextFollowing) => (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={nextFollowing.id}>
          <div className="following__content">
            <div className="following__data">
              <h3 data-test="following-name">{nextFollowing.login}</h3>
              <Button
                data-test="following-btn"
                onClick={() => navigateToUrl(nextFollowing.html_url, '_blank')}
                color="primary"
                variant="contained"
                disabled={false}
                endIcon={<Icon>account_circle</Icon>}
              >
                VISIT GITHUB USER
              </Button>
            </div>
            <img
              data-test="following-image"
              alt="user following avatar"
              src={nextFollowing.avatar_url}
            />
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

Following.propTypes = {
  following: followingModel,
  user: PropTypes.string,
  onFetchFollowing: PropTypes.func,
};

export default Following;
