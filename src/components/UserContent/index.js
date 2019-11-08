import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

/* components */
import Menu from '../Menu';
import UserData from './UserData';
import UserRepos from './UserRepos';
import UserFollowing from './UserFollowing';
import UserFollowers from './UserFollowers';

/* utils */
import { userDataModel } from '../../utils/models';

/* core */
import FloatBtn from '../core/FloatBtn';

class UserContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSection: 0,
      reposData: null,
      followingData: null,
      followersData: null
    };

    this.availableDataSections = {
      userSection: true,
      reposSection: props.userData.public_repos,
      followingSection: props.userData.followers,
      followersSection: props.userData.following
    };
  }

  render() {
    const { userData, backIntro } = this.props;
    const { login } = userData;
    const {
      activeSection,
      reposData,
      followingData,
      followersData
    } = this.state;

    return (
      <Fragment>
        <Menu
          data-test="userContent-menu"
          onClick={activeSection =>
            this.setState({
              activeSection
            })
          }
          tabs={this.availableDataSections}
        />
        <FloatBtn data-test="userContent-floatBtn" onClick={backIntro} />
        {activeSection === 0 && (
          <UserData data-test="userContent-userData" userData={userData} />
        )}
        {activeSection === 1 && (
          <UserRepos
            data-test="userContent-userRepos"
            user={login}
            setReposData={data => this.setState({ reposData: data })}
            reposData={reposData}
          />
        )}
        {activeSection === 2 && (
          <UserFollowing
            data-test="userContent-userFollowing"
            user={login}
            setFollowingData={data => this.setState({ followingData: data })}
            followingData={followingData}
          />
        )}
        {activeSection === 3 && (
          <UserFollowers
            data-test="userContent-userFollowers"
            user={login}
            setFollowersData={data => this.setState({ followersData: data })}
            followersData={followersData}
          />
        )}
      </Fragment>
    );
  }
}

UserContent.propTypes = {
  userData: userDataModel,
  backIntro: PropTypes.func.isRequired
};

export default UserContent;
