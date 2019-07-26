import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

/* components */
import Menu from '../Menu';
import UserData from '../UserData';
import UserRepos from '../UserRepos';
import UserFollowing from '../UserFollowing';
import UserFollowers from '../UserFollowers';
import UserStarred from '../UserStarred';

/* utils */
import { userDataModel } from '../../utils/models';

/* core */
import FloatBtn from '../core/FloatBtn';

const availableDataSections = {
  userSection: true,
  reposSection: false,
  followingSection: false,
  followersSection: false,
  starredSection: false
};

class Content extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSection: 0
    };
  }

  render() {
    const { userData, backIntro } = this.props;
    const { login } = userData;
    const { activeSection } = this.state;

    return (
      <Fragment>
        <Menu
          onClick={activeSection =>
            this.setState({
              activeSection
            })
          }
          tabs={availableDataSections}
        />
        <FloatBtn onClick={backIntro} />
        {activeSection === 0 && <UserData data={userData} />}
        {activeSection === 1 && <UserRepos user={login} />}
        {activeSection === 2 && <UserFollowing user={login} />}
        {activeSection === 3 && <UserFollowers user={login} />}
        {activeSection === 4 && <UserStarred user={login} />}
      </Fragment>
    );
  }
}

Content.propTypes = {
  backIntro: PropTypes.func,
  userData: userDataModel
};

export default Content;
