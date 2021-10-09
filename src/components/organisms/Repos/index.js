import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/* material-ui */
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';

/* atoms */
import Loader from '../../atoms/Loader';

/* services */
import { getRepos } from '../../../services/github';

/* utils */
import { reposModel } from '../../../utils/models';

const Root = styled('div')({
  display: 'grid',
  gridColumn: '2/5',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gridGap: 20,
  marginTop: 30,
});

const Repo = styled('div')(({ theme }) => ({
  border: `1px solid ${theme.palette.secondary.light}`,
  borderRadius: 4,
  display: 'flex',
  flexDirection: 'column',
  padding: 20,
}));

const RepoTitle = styled('div')({
  alignItems: 'center',
  display: 'flex',
});

const RepoIcon = styled(FolderIcon)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: '1.3rem',
  marginRight: 8,
}));

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
      {repos.map((repo) => (
        <Repo data-test="repos-item" key={repo.name}>
          <RepoTitle>
            <RepoIcon />
            <Typography variant="h5">{repo.name}</Typography>
          </RepoTitle>
          {repo.description && (
            <Typography variant="body2" sx={{ marginTop: 1 }}>
              {repo.description}
            </Typography>
          )}
        </Repo>
      ))}
    </Root>
  );
};

Repos.propTypes = {
  repos: reposModel,
  user: PropTypes.string,
  onFetchRepos: PropTypes.func,
};

export default Repos;
