import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

/* material-ui */
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import FolderIcon from '@mui/icons-material/Folder';

/* atoms */
import GithubIcon from '../../atoms/GithubIcon';
import Placeholder from '../../atoms/Placeholder';

/* services */
import { getRepos } from '../../../services/github';

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

const Repos = ({ total, user, onFetchRepos, repos: reposData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [repos, setRepos] = useState(reposData);

  useEffect(() => {
    if (reposData.length > 0) {
      return;
    }

    setIsLoading(true);

    getRepos(user)
      .then((repos) => {
        setIsLoading(false);
        setRepos(repos);
        onFetchRepos(repos);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  if (total === 0) {
    return (
      <EmptyMsg>
        <Typography variant="h6">No repos added</Typography>
      </EmptyMsg>
    );
  }

  if (isLoading) {
    const placeholderList = new Array(total);
    placeholderList.fill('');

    return placeholderList.map((item) => <Placeholder key={uuidv4()} />);
  }

  return repos.map((repo) => (
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
  ));
};

export default Repos;
