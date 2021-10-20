import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

/* material-ui */
import Typography from '@mui/material/Typography';

/* atoms */
import Link from '../atoms/Link';
import Placeholder from '../atoms/Placeholder';

/* services */
import { getRepos } from '../../services/github';

/* styles */
import {
  CardTitle,
  CardEmptyMsg,
  RepoCard,
  RepoIcon,
  RepoTopics,
  RepoTopic,
  RepoAction,
} from './styles';

type Props = { total: number; user: any; onFetchRepos: (repo: any) => void; repos: any[] };

const Repos = ({ total, user, onFetchRepos, repos: reposData }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [repos, setRepos] = useState(reposData);

  useEffect(() => {
    if (reposData.length > 0) {
      return;
    }

    setIsLoading(true);

    getRepos(user)
      .then((repos: any) => {
        setIsLoading(false);
        setRepos(repos);
        onFetchRepos(repos);
      })
      .catch((error: any) => {
        throw error;
      });
  }, []);

  if (total === 0) {
    return (
      <CardEmptyMsg>
        <Typography variant="h6">No repos added</Typography>
      </CardEmptyMsg>
    );
  }

  if (isLoading) {
    const placeholderList = new Array(total);
    placeholderList.fill('');

    return (
      <>
        {placeholderList.map(() => (
          <Placeholder key={uuidv4()} />
        ))}
      </>
    );
  }

  return (
    <>
      {repos.map((repo: any) => (
        <RepoCard data-test="repos-item" key={repo.name}>
          <div>
            <CardTitle>
              <RepoIcon />
              <Typography variant="h5">{repo.name}</Typography>
            </CardTitle>
            {repo.description ? (
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                {repo.description}
              </Typography>
            ) : (
              <Typography variant="h6" sx={{ marginTop: 1 }}>
                No description added
              </Typography>
            )}

            <RepoTopics>
              {repo.topics?.length > 0 ? (
                repo.topics.map((topic: string) => (
                  <RepoTopic key={topic}>
                    <Typography variant="overline">{topic}</Typography>
                  </RepoTopic>
                ))
              ) : (
                <RepoTopic>
                  <Typography variant="overline">NO TOPICS</Typography>
                </RepoTopic>
              )}
            </RepoTopics>
          </div>
          <RepoAction>
            <Link
              url={repo.html_url}
              ariaLabel={`View ${repo.name} repository on GitHub`}
              content="VISIT REPO"
              withIcon
              iconType="folder_open"
            />
          </RepoAction>
        </RepoCard>
      ))}
    </>
  );
};

export default Repos;
