import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

/* components */
import Menu from '../Menu';
import UserData from '../UserData';
import UserRepos from '../UserRepos';
import UserFollowing from '../UserFollowing';
import UserFollowers from '../UserFollowers';

/* utils */
import { userDataModel } from '../../utils/models';

/* core */
import FloatBtn from '../core/FloatBtn';

class Content extends Component {
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
          onClick={activeSection =>
            this.setState({
              activeSection
            })
          }
          tabs={this.availableDataSections}
        />
        <FloatBtn onClick={backIntro} />
        {activeSection === 0 && <UserData data={userData} />}
        {activeSection === 1 && (
          <UserRepos
            user={login}
            setReposData={data => this.setState({ reposData: data })}
            reposData={reposData}
          />
        )}
        {activeSection === 2 && (
          <UserFollowing
            user={login}
            setFollowingData={data => this.setState({ followingData: data })}
            followingData={followingData}
          />
        )}
        {activeSection === 3 && (
          <UserFollowers
            user={login}
            setFollowersData={data => this.setState({ followersData: data })}
            followersData={followersData}
          />
        )}
      </Fragment>
    );
  }
}

Content.propTypes = {
  backIntro: PropTypes.func,
  userData: userDataModel
};

export default Content;
