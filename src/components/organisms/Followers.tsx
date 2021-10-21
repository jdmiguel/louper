import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

/* material-ui */
import Typography from '@mui/material/Typography';

/* atoms */
import Label from '../atoms/Label';
import Link from '../atoms/Link';
import Placeholder from '../atoms/Placeholder';

/* services */
import { getFollowers } from '../../services/github';

/* types */
import { Follower } from '../../utils/types';

/* styles */
import { CardTitle, CardEmptyMsg, UserCard, UserCardContent } from './styles';

type Props = {
  total: number;
  userName: string;
  onFetchFollowers: (followers: Follower[]) => void;
  followers: Follower[];
};

const FollowerSection = ({
  total,
  userName,
  followers: followersData,
  onFetchFollowers,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [followers, setFollowers] = useState(followersData);

  useEffect(() => {
    if (followersData.length > 0) {
      return;
    }

    setIsLoading(true);

    getFollowers(userName)
      .then((followers) => {
        setIsLoading(false);
        setFollowers(followers);
        onFetchFollowers(followers);
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
      {followers.map((follower) => (
        <UserCard key={follower.login}>
          <img alt="user following avatar" src={follower.avatar_url} />
          <UserCardContent>
            <CardTitle>
              <Label content={follower.login} withIcon iconType="favorite" />
            </CardTitle>
            <Link
              url={follower.html_url}
              ariaLabel={`View ${follower.login} profile on GitHub`}
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

export default FollowerSection;
