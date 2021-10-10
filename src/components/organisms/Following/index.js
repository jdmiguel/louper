import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/* material-ui */
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import FollowingIcon from '@mui/icons-material/Visibility';

/* atoms */
import GithubIcon from '../../atoms/GithubIcon';
import Loader from '../../atoms/Loader';

/* services */
import { getFollowings } from '../../../services/github';

/* utils */
import { navigateToUrl } from '../../../utils';
import { followingModel } from '../../../utils/models';

const Root = styled('div')({
  display: 'grid',
  gridColumn: '2/5',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gridGap: 20,
  marginTop: 30,
});

const FollowingCard = styled('div')(({ theme }) => ({
  border: `1px solid ${theme.palette.secondary.light}`,
  borderRadius: 4,
  display: 'flex',
  padding: 20,
  '& img': {
    borderRadius: '50%',
    height: 80,
    marginRight: 12,
    width: 80,
  },
}));

const Content = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

const Title = styled('div')(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  '& path': { fill: theme.palette.secondary.main },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  cursor: 'pointer',
  alignItems: 'center',
  display: 'flex',
  fontSize: '0.9rem',
  fontWeight: 700,
  marginTop: 4,
  textDecoration: 'none',
  textTransform: 'uppercase',
  transition: 'color ease-out 250ms',
  '& path': { transition: 'fill ease-out 250ms' },
  '&:hover': {
    color: theme.palette.primary.light,
    '& path': { fill: theme.palette.primary.light },
  },
}));

const StyledFollowingIcon = styled(FollowingIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '1.3rem',
  marginRight: 6,
  marginBottom: 2,
}));

const GithubIconWrapper = styled('div')(({ theme }) => ({
  marginRight: 6,
  '& svg': {
    width: 22,
    '& path': {
      fill: theme.palette.primary.main,
    },
  },
}));

const EmptyMsg = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: 8,
});

const Following = ({ following: followingData, user, onFetchFollowing }) => {
  const [following, setFollowing] = useState(followingData);

  useEffect(() => {
    if (followingData.length > 0) {
      return;
    }

    getFollowings(user)
      .then((fetchedFollowing) => {
        setFollowing(fetchedFollowing);
        onFetchFollowing(fetchedFollowing);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  if (following.length === 0) {
    return <Loader data-test="followings-loader" />;
  }

  return (
    <Root>
      {following.length > 0 ? (
        following.map((nextFollowing) => (
          <FollowingCard>
            <img
              data-test="following-image"
              alt="user following avatar"
              src={nextFollowing.avatar_url}
            />
            <Content>
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
            </Content>
          </FollowingCard>
        ))
      ) : (
        <EmptyMsg>
          <Typography variant="h6">No following added</Typography>
        </EmptyMsg>
      )}
    </Root>
  );
};

Following.propTypes = {
  following: followingModel,
  user: PropTypes.string,
  onFetchFollowing: PropTypes.func,
};

export default Following;
