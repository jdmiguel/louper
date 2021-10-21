import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

/* material-ui */
import Typography from '@mui/material/Typography';

/* atoms */
import Placeholder from '../atoms/Placeholder';

/* molecules */
import Card from '../molecules/Card';

/* services */
import { getFollowers } from '../../services/github';

/* types */
import { RelatedUser } from '../../utils/types';

/* styles */
import { EmptyMsg } from './styles';

type Props = {
  total: number;
  userName: string;
  onFetchFollowers: (followers: RelatedUser[]) => void;
  followers: RelatedUser[];
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
      <EmptyMsg>
        <Typography variant="h6">No following added</Typography>
      </EmptyMsg>
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
        <Card key={follower.login} theme="USER" data={follower} />
      ))}
    </>
  );
};

export default FollowerSection;
