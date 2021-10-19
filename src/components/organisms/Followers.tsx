import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

/* material-ui */
import Typography from '@mui/material/Typography';

/* atoms */
import GithubIcon from '../atoms/GithubIcon';
import Placeholder from '../atoms/Placeholder';

/* services */
import { getFollowers } from '../../services/github';

/* utils */
import { navigateToUrl } from '../../utils';

/* styles */
import {
  UserCard, UserCardContent, GithubIconWrapper, StyledLink, StyledFollowerIcon,
  Title,  EmptyMsg
} from './styles'

type Props = {total: number, user: any, onFetchFollowers: (follower: any) => void, followers: any[]}

const Followers = ({
  total,
  followers: followersData,
  user,
  onFetchFollowers,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [followers, setFollowers] = useState(followersData);

  useEffect(() => {
    if (followersData.length > 0) {
      return;
    }

    setIsLoading(true);

    getFollowers(user)
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
        {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        placeholderList.map((_item: string) => <Placeholder key={uuidv4()} />)
        }
      </>
    );
  }

  return (
    <>
      {
        followers.map((follower) => (
          <UserCard key={follower.login}>
            <img alt="user following avatar" src={follower.avatar_url} />
            <UserCardContent>
              <Title>
                <StyledFollowerIcon />
                <Typography variant="h5">{follower.login}</Typography>
              </Title>
              <StyledLink
                onClick={() => navigateToUrl(follower.html_url)}
                target="_self"
                rel="noopener noreferrer"
                aria-label={`View ${follower.login} profile on GitHub`}
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

export default Followers;
