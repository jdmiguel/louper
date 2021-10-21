import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

/* material-ui */
import Typography from '@mui/material/Typography';

/* atoms */
import Placeholder from '../atoms/Placeholder';

/* molecules */
import Card from '../molecules/Card';

/* services */
import { getRepos } from '../../services/github';

/* types */
import { Repo } from '../../utils/types';

/* styles */
import { EmptyMsg } from './styles';

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
      <EmptyMsg>
        <Typography variant="h6">No repos added</Typography>
      </EmptyMsg>
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
        <Card key={repo.name} theme="REPO" data={repo} />
      ))}
    </>
  );
};

export default RepoSection;
