import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/* material-ui */
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';

/* atoms */
import Loader from '../../atoms/Loader';

/* services */
import { getRepos } from '../../../services/github';

/* utils */
import { navigateToUrl } from '../../../utils';
import { reposModel } from '../../../utils/models';

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const StyledAvatar = styled(Avatar)({
  root: {
    '& svg': {
      fontSize: '1.5rem',
    },
  },
});

const Repos = ({ repos: reposData, user, onFetchRepos }) => {
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
    <Root>
      <List>
        {repos.map((repo) => (
          <ListItem
            data-test="repos-item"
            key={repo.name}
            button
            onClick={() => navigateToUrl(repo.html_url)}
            className="repos__item"
          >
            <StyledAvatar data-test="repos-icon">
              <FolderIcon className="repos__icon" />
            </StyledAvatar>
            <ListItemText
              data-test="repos-name"
              primary={repo.name}
              secondary={repo.description}
            />
          </ListItem>
        ))}
      </List>
    </Root>
  );
};

Repos.propTypes = {
  repos: reposModel,
  user: PropTypes.string,
  onFetchRepos: PropTypes.func,
};

export default Repos;
