import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/* material-ui */
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';

/* atoms */
import Loader from '../../atoms/Loader';

/* services */
import { getRepos } from '../../../services/github';

/* utils */
import { externalLink } from '../../../utils';
import { reposModel } from '../../../utils/models';

const useStyles = makeStyles({
  root: {
    '& svg': {
      fontSize: '1.5rem',
    },
  },
});

const Repos = ({ repos: reposData, user, onFetchRepos }) => {
  const classes = useStyles();

  const [repos, setRepos] = useState(reposData);

  useEffect(() => {
    if (reposData.length > 0) {
      return;
    }

    getRepos(user)
      .then((repos) => {
        setRepos(repos);
        onFetchRepos(repos);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  if (repos.length === 0) {
    return <Loader data-test="repos-loader" />;
  }

  return (
    <div data-test="repos-wrapper" className="repos__wrapper">
      <List>
        {repos.map((repo) => (
          <ListItem
            data-test="repos-item"
            key={repo.name}
            button
            onClick={() => externalLink(repo.html_url)}
            className="repos__item"
          >
            <Avatar className={classes.root} data-test="repos-icon">
              <FolderIcon className="repos__icon" />
            </Avatar>
            <ListItemText
              data-test="repos-name"
              primary={repo.name}
              secondary={repo.description}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

Repos.propTypes = {
  repos: reposModel,
  user: PropTypes.string,
  onFetchRepos: PropTypes.func,
};

export default Repos;
