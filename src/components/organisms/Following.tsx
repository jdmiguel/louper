import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

/* material-ui */
import Typography from '@mui/material/Typography';

/* atoms */
import Link from '../atoms/Link';
import Placeholder from '../atoms/Placeholder';

/* services */
import { getFollowings } from '../../services/github';

/* types */
import { Following } from '../../utils/types';

/* styles */
import { CardTitle, CardEmptyMsg, UserCard, UserCardContent, UserFollowingIcon } from './styles';

type Props = {
  total: number;
  userName: string;
  following: Following[];
  onFetchFollowing: (following: Following[]) => void;
};

const FollowingSection = ({
  total,
  userName,
  following: followingData,
  onFetchFollowing,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [following, setFollowing] = useState(followingData);

  useEffect(() => {
    if (followingData.length > 0) {
      return;
    }

    setIsLoading(true);

    getFollowings(userName)
      .then((fetchedFollowing) => {
        setIsLoading(false);
        setFollowing(fetchedFollowing);
        onFetchFollowing(fetchedFollowing);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  if (total === 0) {
    return (
      <CardEmptyMsg>
        <Typography variant="h6">No following added</Typography>
      </CardEmptyMsg>
    );
  }

  if (isLoading) {
    const placeholderList = new Array(total);
    placeholderList.fill('');

    return (
      <>
        {placeholderList.map(() => (
          <Placeholder key={uuidv4()} withUserTheme />
        ))}
      </>
    );
  }

  return (
    <>
      {following.map((nextFollowing: Following) => (
        <UserCard key={nextFollowing.login}>
          <img alt="user following avatar" src={nextFollowing.avatar_url} />
          <UserCardContent>
            <CardTitle>
              <UserFollowingIcon />
              <Typography variant="h5">{nextFollowing.login}</Typography>
            </CardTitle>
            <Link
              url={nextFollowing.html_url}
              ariaLabel={`View ${nextFollowing.login} profile on GitHub`}
              content="VISIT PROFILE"
              withIcon
              iconType="person"
            />
          </UserCardContent>
        </UserCard>
      ))}
    </>
  );
};

export default FollowingSection;
