import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* material-ui */
import Grid from '@material-ui/core/Grid';

/* core */
import Btn from '../../core/Btn';
import Loader from '../../core/Loader';

/* services */
import { getFollowing } from '../../../services/github';

/* utils */
import { externalLink } from '../../../utils';

/* styles */
import './styles.css';

class UserFollowing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.followingData,
    };
  }

  componentDidMount() {
    const { user, setFollowingData } = this.props;
    const { data } = this.state;

    if (!data.length) {
      getFollowing(user)
        .then((data) => {
          this.setState({
            data,
          });
          setFollowingData(data);
        })
        .catch((error) => {
          throw error;
        });
    }
  }

  render() {
    const { data } = this.state;

    return data.length ? (
      <Grid
        data-test="userFollowing-container"
        container
        className="userFollowingContainer"
        spacing={16}
      >
        {data.map((userFollowing) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={userFollowing.id}>
            <div className="userFollowingDataContainer">
              <div className="userFollowingTxtContainer">
                <h3 data-test="userFollowing-name">{userFollowing.login}</h3>
                <Btn
                  data-test="userFollowing-btn"
                  onClick={() => externalLink(userFollowing.html_url, '_blank')}
                  type="account_circle"
                  txt="VISIT PROFILE"
                />
              </div>
              <img
                data-test="userFollowing-image"
                alt="user following avatar"
                src={userFollowing.avatar_url}
                className="userFollowingAvatar"
              />
            </div>
          </Grid>
        ))}
      </Grid>
    ) : (
      <Loader data-test="userFollowing-loader" />
    );
  }
}

UserFollowing.propTypes = {
  user: PropTypes.string,
  setFollowingData: PropTypes.func,
};

export default UserFollowing;
