import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

/* material-ui */
import Typography from '@mui/material/Typography';

/* atoms */
import GithubIcon from '../atoms/GithubIcon';
import Placeholder from '../atoms/Placeholder';

/* services */
import { getFollowings } from '../../services/github';

/* utils */
import { navigateToUrl } from '../../utils';

/* styles */
import {
  UserCard, UserCardContent, GithubIconWrapper, StyledLink, StyledFollowingIcon,
  Title,  EmptyMsg
} from './styles'

type Props = {total: number, user: any, onFetchFollowing: (following: any) => void, following: any[]}

const Following = ({
  total,
  following: followingData,
  user,
  onFetchFollowing,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [following, setFollowing] = useState(followingData);

  useEffect(() => {
    if (followingData.length > 0) {
      return;
    }

    setIsLoading(true);

    getFollowings(user)
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
    const placeholderList = new Array(total)
    placeholderList.fill('');

    return (
      <>
        {placeholderList.map((_item: string) => <Placeholder key={uuidv4()} />)}
      </>
    );
  }

  return (
    <>
      {
        following.map((nextFollowing: any) => (
          <UserCard key={nextFollowing.login}> 
            <img alt="user following avatar" src={nextFollowing.avatar_url} />
            <UserCardContent>
              <Title>
                <StyledFollowingIcon />
                <Typography variant="h5">{nextFollowing.login}</Typography>
              </Title>
              <StyledLink
                onClick={() => navigateToUrl(nextFollowing.html_url)}
                target="_self"
                rel="noopener noreferrer"
                aria-label={`View ${nextFollowing.login} profile on GitHub`}
              >
                <GithubIconWrapper>
                  <GithubIcon />
                </GithubIconWrapper>
                Visit profile
              </StyledLink>
            </UserCardContent>
          </UserCard>
        ))
      }
    </>
  );
};

export default Following;
