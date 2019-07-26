import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* core */
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import Loader from '../core/Loader';

/* icons */

/* services */
import { getRepos } from '../../services/github';

/* utils */
import { externalLink } from '../../utils/externalLink';
import { reposDataModel } from '../../utils/models';

/* styles */
import './styles.css';

class UserRepos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.reposData || null,
      isLoading: !props.reposData
    };
  }

  componentDidMount() {
    const { user, setReposData } = this.props;
    const { data } = this.state;

    if (!data) {
      getRepos(user)
        .then(data => {
          this.setState({
            data
          });
          setReposData(data);
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
      <div className="userReposContainer">
        <List>
          {data.map(repo => (
            <ListItem
              key={repo.name}
              button
              onClick={() => externalLink(repo.html_url)}
              className="itemUserRepos"
            >
              <Avatar>
                <FolderIcon className="iconUserRepos" />
              </Avatar>
              <ListItemText primary={repo.name} secondary={repo.description} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

UserRepos.propTypes = {
  user: PropTypes.string,
  setReposData: PropTypes.func,
  reposData: reposDataModel
};

export default UserRepos;
