import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonIcon from '@material-ui/icons/Person';
import FolderIcon from '@material-ui/icons/Folder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import VisibilityIcon from '@material-ui/icons/Visibility';
import StarIcon from '@material-ui/icons/Star';
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
    const {
      reposSection,
      followingSection,
      followersSection,
      starredSection
    } = tabs;

    return (
      <div className="menu">
        <Paper>
          <Tabs
            value={value}
            onChange={this.changeHandler}
            indicatorColor="primary"
            textColor="primary"
            className="tabs"
            centered
          >
            <Tab label="USER DATA" icon={<PersonIcon />} />
            {reposSection && <Tab label="REPOSITORIES" icon={<FolderIcon />} />}
            {followingSection && (
              <Tab label="FOLLOWING" icon={<FavoriteIcon />} />
            )}
            {followersSection && (
              <Tab label="FOLLOWERS" icon={<VisibilityIcon />} />
            )}
            {starredSection && <Tab label="STARRED" icon={<StarIcon />} />}
          </Tabs>
        </Paper>
      </div>
    );
  }
}

Menu.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Menu;
