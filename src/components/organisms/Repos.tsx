import { useState, useEffect, useMemo } from 'react';
import UserSection from '../organisms/UserSection';
import { ResponseError, BASE_URL, handleErrors } from '../../utils/request';
import { Repo } from '../../utils/types';

type Props = {
  userName: string;
  repos: Repo[] | null;
  totalRepos: number;
  onFetchRepos: (repos: Repo[]) => void;
  onRequestError: () => void;
};

const Repos = ({ userName, repos, totalRepos, onFetchRepos, onRequestError }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const abortController = useMemo(() => new AbortController(), []);

  useEffect(() => {
    if (repos) {
      return;
    }

    setIsLoading(true);

    fetch(`${BASE_URL}/users/${userName}/repos`, {
      signal: abortController.signal,
    })
      .then(handleErrors)
      .then((fetchedRepos: Repo[]) => {
        onFetchRepos(fetchedRepos);
      })
      .catch((error: ResponseError) => {
        if (error.status === 20) {
          return;
        }
        onRequestError();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [abortController, repos, onFetchRepos, onRequestError, userName]);

  return (
    <UserSection
      type="REPOS"
      totalItems={totalRepos}
      isLoading={isLoading}
      items={repos || []}
      emptyMsg="No repos added"
    />
  );
};

export default Repos;
