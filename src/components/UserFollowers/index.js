import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* core */
import Grid from '@material-ui/core/Grid';
import Btn from '../core/Btn';
import Loader from '../core/Loader';

/* services */
import { getFollowers } from '../../services/github';

/* utils */
import { externalLink } from '../../utils/externalLink';
import { followersDataModel } from '../../utils/models';

/* styles */
import './styles.css';

class UserFollowers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.followersData || null,
      isLoading: !props.followersData
    };
  }

  componentDidMount() {
    const { user, setFollowersData } = this.props;
    const { data } = this.state;

    if (!data) {
      getFollowers(user)
        .then(data => {
          this.setState({
            data
          });
          setFollowersData(data);
        })
        .catch(error => {
          throw error;
        })
        .finally(() => {
          this.setState({
            isLoading: false
          });
        });
    }
  }

  render() {
    const { isLoading, data } = this.state;

    return isLoading ? (
      <Loader />
    ) : (
      <Grid container className="userFollowerContainer" spacing={16}>
        {data.map(userFollower => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={userFollower.id}>
            <div className="userFollowerDataContainer">
              <div className="userFollowerTxtContainer">
                <h3>{userFollower.login}</h3>
                <Btn
                  onClick={() => externalLink(userFollower.html_url, '_blank')}
                  type="account_circle"
                  txt="VISIT PROFILE"
                />
              </div>
              <img
                alt="user follower avatar"
                src={userFollower.avatar_url}
                className="userFollowerAvatar"
              />
            </div>
          </Grid>
        ))}
      </Grid>
    );
  }
}

UserFollowers.propTypes = {
  setFollowersData: PropTypes.func,
  followersData: followersDataModel
};

export default UserFollowers;
