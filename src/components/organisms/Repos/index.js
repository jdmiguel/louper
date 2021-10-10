import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/* material-ui */
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import FolderIcon from '@mui/icons-material/Folder';

/* atoms */
import GithubIcon from '../../atoms/GithubIcon';
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
  justifyContent: 'space-between',
  padding: 20,
}));

const Title = styled('div')(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  '& path': { fill: theme.palette.secondary.main },
}));

const RepoIcon = styled(FolderIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '1.3rem',
  marginRight: 6,
  marginBottom: 2,
}));

const Topics = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: 14,
  marginBottom: 12,
});

const Topic = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderRadius: 4,
  color: theme.palette.secondary.light,
  padding: '4px 8px',
  marginBottom: 5,
  marginRight: 5,
}));

const StyledLink = styled(Link)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.secondary.light}`,
  cursor: 'pointer',
  alignItems: 'center',
  display: 'flex',
  fontSize: '0.9rem',
  fontWeight: 700,
  paddingTop: 10,
  marginTop: 10,
  textDecoration: 'none',
  textTransform: 'uppercase',
  transition: 'color ease-out 250ms',
  '& path': { transition: 'fill ease-out 250ms' },
  '&:hover': {
    color: theme.palette.primary.light,
    '& path': { fill: theme.palette.primary.light },
  },
}));

const GithubIconWrapper = styled('div')(({ theme }) => ({
  marginRight: 6,
  '& svg': {
    width: 22,
    '& path': {
      fill: theme.palette.primary.main,
    },
  },
}));

const EmptyMsg = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: 8,
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
      {repos.length > 0 ? (
        repos.map((repo) => (
          <Repo data-test="repos-item" key={repo.name}>
            <div>
              <Title>
                <RepoIcon />
                <Typography variant="h5">{repo.name}</Typography>
              </Title>
              {repo.description ? (
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                  {repo.description}
                </Typography>
              ) : (
                <Typography variant="h6" sx={{ marginTop: 1 }}>
                  No description added
                </Typography>
              )}

              <Topics>
                {repo.topics?.length > 0 ? (
                  repo.topics.map((topic) => (
                    <Topic key={topic}>
                      <Typography variant="body2">{topic}</Typography>
                    </Topic>
                  ))
                ) : (
                  <Topic>
                    <Typography variant="body2">NO TOPICS</Typography>
                  </Topic>
                )}
              </Topics>
            </div>
            <StyledLink
              href={repo.html_url}
              target="_self"
              rel="noopener noreferrer"
              aria-label={`View ${repo.name} repository on GitHub`}
            >
              <GithubIconWrapper>
                <GithubIcon />
              </GithubIconWrapper>
              Visit repo
            </StyledLink>
          </Repo>
        ))
      ) : (
        <EmptyMsg>
          <Typography variant="h6">No repos added</Typography>
        </EmptyMsg>
      )}
    </Root>
  );
};

Repos.propTypes = {
  repos: reposModel,
  user: PropTypes.string,
  onFetchRepos: PropTypes.func,
};

export default Repos;
