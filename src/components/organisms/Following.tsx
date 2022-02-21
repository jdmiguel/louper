import { useState, useEffect, useMemo } from 'react';
import UserSection from '../organisms/UserSection';
import { ResponseError, BASE_URL, handleErrors } from '../../utils/request';
import { User } from '../../utils/types';

type Props = {
  userName: string;
  following: User[] | null;
  totalFollowing: number;
  onFetchFollowing: (following: User[]) => void;
  onRequestError: () => void;
};

const Following = ({
  userName,
  following,
  totalFollowing,
  onFetchFollowing,
  onRequestError,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const abortController = useMemo(() => new AbortController(), []);

  useEffect(() => {
    if (following) {
      return;
    }

    setIsLoading(true);

    fetch(`${BASE_URL}/users/${userName}/following`, {
      signal: abortController.signal,
    })
      .then(handleErrors)
      .then((fetchedFollowing: User[]) => {
        onFetchFollowing(fetchedFollowing);
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
  }, [abortController, following, onFetchFollowing, onRequestError, userName]);

  return (
    <UserSection
      type="FOLLOWING"
      isLoading={isLoading}
      items={following || []}
      totalItems={totalFollowing}
      emptyMsg="No following added"
    />
  );
};

export default Following;
