import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* material-ui */
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonIcon from '@material-ui/icons/Person';
import FolderIcon from '@material-ui/icons/Folder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import VisibilityIcon from '@material-ui/icons/Visibility';

/* utils */
import { menuTabsModel } from '../../utils/models';

/* styles */
import './styles.css';

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0
    };
  }

  changeHandler = (event, value) => {
    const { onClick } = this.props;

    onClick(value);
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const { tabs } = this.props;

    return (
      <div data-test="menu-container" className="menu">
        <Paper>
          <Tabs
            data-test="menu-tabs"
            value={value}
            onChange={this.changeHandler}
            indicatorColor="primary"
            textColor="primary"
            className="tabs"
            centered
          >
            <Tab
              data-test="menu-tab-userData"
              label="USER DATA"
              icon={<PersonIcon />}
            />
            {tabs.repos && (
              <Tab
                data-test="menu-tab-userRepos"
                label="REPOSITORIES"
                icon={<FolderIcon />}
              />
            )}
            {tabs.following && (
              <Tab
                data-test="menu-tab-userFollowing"
                label="FOLLOWING"
                icon={<FavoriteIcon />}
              />
            )}
            {tabs.followers && (
              <Tab
                data-test="menu-tab-userFollowers"
                label="FOLLOWERS"
                icon={<VisibilityIcon />}
              />
            )}
          </Tabs>
        </Paper>
      </div>
    );
  }
}

Menu.propTypes = {
  onClick: PropTypes.func.isRequired,
  tabs: menuTabsModel
};

export default Menu;
