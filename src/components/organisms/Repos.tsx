import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

/* material-ui */
import Typography from '@mui/material/Typography';

/* atoms */
import Placeholder from '../atoms/Placeholder';
import Label from '../atoms/Label';
import Link from '../atoms/Link';

/* services */
import { getRepos } from '../../services/github';

/* types */
import { Repo } from '../../utils/types';

/* styles */
import { CardTitle, CardEmptyMsg, RepoCard, RepoTopics, RepoTopic, RepoAction } from './styles';

type Props = {
  total: number;
  userName: string;
  repos: Repo[];
  onFetchRepos: (repos: Repo[]) => void;
};

const RepoSection = ({ total, userName, repos: reposData, onFetchRepos }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [repos, setRepos] = useState(reposData);

  useEffect(() => {
    if (reposData.length > 0) {
      return;
    }

    setIsLoading(true);

    getRepos(userName)
      .then((repos: Repo[]) => {
        setIsLoading(false);
        setRepos(repos);
        onFetchRepos(repos);
      })
      .catch((error: Error) => {
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
      {repos.map((repo: Repo) => (
        <RepoCard key={repo.name}>
          <div>
            <CardTitle>
              <Label content={repo.name} withIcon iconType="folder" />
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

export default RepoSection;
