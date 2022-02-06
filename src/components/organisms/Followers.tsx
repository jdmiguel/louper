import { useState, useEffect, useMemo } from 'react';

/* organisms */
import UserSection from '../organisms/UserSection';

/* request */
import { ResponseError, BASE_URL, handleErrors } from '../../utils/request';

/* types */
import { User } from '../../utils/types';

type Props = {
  userName: string;
  followers: User[] | null;
  totalFollowers: number;
  onFetchFollowers: (followers: User[]) => void;
  onRequestError: () => void;
};

const Followers = ({
  userName,
  followers,
  totalFollowers,
  onFetchFollowers,
  onRequestError,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const abortController = useMemo(() => new AbortController(), []);

  useEffect(() => {
    if (followers) {
      return;
    }

    setIsLoading(true);

    fetch(`${BASE_URL}/users/${userName}/followers`, {
      signal: abortController.signal,
    })
      .then(handleErrors)
      .then((fetchedFollowers: User[]) => {
        onFetchFollowers(fetchedFollowers);
      })
      .catch((error: ResponseError) => {
        if (error.code === 20) {
          return;
        }
        onRequestError();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [abortController, followers, onFetchFollowers, onRequestError, userName]);

  return (
    <UserSection
      type="FOLLOWERS"
      isLoading={isLoading}
      items={followers || []}
      totalItems={totalFollowers}
      emptyMsg="No followers added"
    />
  );
};

export default Followers;
