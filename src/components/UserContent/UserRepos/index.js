import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* material-ui */
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';

/* core */
import Loader from '../../core/Loader';

/* services */
import { getRepos } from '../../../services/github';

/* utils */
import { externalLink } from '../../../utils';

/* styles */
import './styles.css';

class UserRepos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.reposData,
    };
  }

  componentDidMount() {
    const { user, setReposData } = this.props;
    const { data } = this.state;

    if (!data.length) {
      getRepos(user)
        .then((data) => {
          this.setState({
            data,
          });
          setReposData(data);
        })
        .catch((error) => {
          throw error;
        });
    }
  }

  render() {
    const { data } = this.state;

    return data.length ? (
      <div data-test="userRepos-container" className="userReposContainer">
        <List>
          {data.map((repo) => (
            <ListItem
              data-test="userRepos-item"
              key={repo.name}
              button
              onClick={() => externalLink(repo.html_url)}
              className="itemUserRepos"
            >
              <Avatar data-test="userRepos-icon">
                <FolderIcon className="iconUserRepos" />
              </Avatar>
              <ListItemText
                data-test="userRepos-name"
                primary={repo.name}
                secondary={repo.description}
              />
            </ListItem>
          ))}
        </List>
      </div>
    ) : (
      <Loader data-test="userRepos-loader" />
    );
  }
}

UserRepos.propTypes = {
  user: PropTypes.string,
  setReposData: PropTypes.func,
};

export default UserRepos;
