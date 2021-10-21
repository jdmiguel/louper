import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

/* material-ui */
import Typography from '@mui/material/Typography';

/* atoms */
import Placeholder from '../atoms/Placeholder';

/* molecules */
import Card from '../molecules/Card';

/* services */
import { getFollowings } from '../../services/github';

/* types */
import { RelatedUser } from '../../utils/types';

/* styles */
import { EmptyMsg } from './styles';

type Props = {
  total: number;
  userName: string;
  following: RelatedUser[];
  onFetchFollowing: (following: RelatedUser[]) => void;
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
      {following.map((nextFollowing) => (
        <Card key={nextFollowing.login} theme="USER" data={nextFollowing} />
      ))}
    </>
  );
};

export default FollowingSection;
