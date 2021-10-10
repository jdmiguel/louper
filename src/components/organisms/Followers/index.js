import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/* material-ui */
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import FollowerIcon from '@mui/icons-material/Favorite';

/* atoms */
import GithubIcon from '../../atoms/GithubIcon';
import Loader from '../../atoms/Loader';

/* services */
import { getFollowers } from '../../../services/github';

/* utils */
import { navigateToUrl } from '../../../utils';
import { followersModel } from '../../../utils/models';

const Root = styled('div')({
  display: 'grid',
  gridColumn: '2/5',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gridGap: 20,
  marginTop: 30,
});

const FollowerCard = styled('div')(({ theme }) => ({
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

const StyledFollowerIcon = styled(FollowerIcon)(({ theme }) => ({
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

const Followers = ({ followers: followersData, user, onFetchFollowers }) => {
  const [followers, setFollowers] = useState(followersData);

  useEffect(() => {
    if (followersData.length > 0) {
      return;
    }

    getFollowers(user)
      .then((followers) => {
        setFollowers(followers);
        onFetchFollowers(followers);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  if (followers.length === 0) {
    return <Loader data-test="followers-loader" />;
  }

  return (
    <Root>
      {followers.map((follower) => (
        <FollowerCard>
          <img
            data-test="following-image"
            alt="user following avatar"
            src={follower.avatar_url}
          />
          <Content>
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
          </Content>
        </FollowerCard>
      ))}
    </Root>
  );
};

Followers.propTypes = {
  followers: followersModel,
  user: PropTypes.string,
  onFetchFollowers: PropTypes.func,
};

export default Followers;
