import { useState } from 'react';
import PropTypes from 'prop-types';

/* material-ui */
import { styled } from '@mui/material/styles';

/* organisms */
import Profile from '../../organisms/Profile';
import ProfileMobile from '../../organisms/Profile/mobile';
import Repos from '../../organisms/Repos';
import Followers from '../../organisms/Followers';
import Following from '../../organisms/Following';

/* molecules */
import Menu from '../../molecules/Menu';

/* utils */
import { dataModel } from '../../../utils/models';

const Root = styled('div')({
  padding: '0 20px',
  '@media (min-width: 769px)': {
    padding: '0 40px',
  },
});

const Wrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: 50,
});

const ProfileWrapper = styled('aside')({
  margin: '60px 40px 0 0',
  '@media (max-width: 768px)': {
    display: 'none',
  },
});

const Content = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  '@media (max-width: 992px)': {
    width: '100%',
  },
});

const ContentUser = styled('main')({
  display: 'grid',
  gridGap: 20,
  marginTop: 30,
  '@media (min-width: 992px)': {
    gridTemplateColumns: 'repeat(2, 300px)',
  },
  '@media (min-width: 1200px)': {
    gridTemplateColumns: 'repeat(2, 420px)',
  },
});

const User = ({ data, onBackFinder }) => {
  const [activeSection, setActiveUserSection] = useState(0);
  const [repos, setRepos] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);

  return (
    <Root>
      <Wrapper>
        <ProfileWrapper>
          <Profile data-test="user-profile" data={data} />
        </ProfileWrapper>
        <Content>
          <ProfileMobile data-test="user-profile" data={data} />
          <Menu
            data-test="user-menu"
            onClick={(section) => {
              setActiveUserSection(section);
              if (section === 3) {
                onBackFinder();
              }
            }}
          />
          <ContentUser>
            {activeSection === 0 && (
              <Repos
                total={data.repos}
                user={data.login}
                onFetchRepos={(repos) => setRepos(repos)}
                repos={repos}
              />
            )}
            {activeSection === 1 && (
              <Following
                total={data.following}
                user={data.login}
                onFetchFollowing={(following) => setFollowing(following)}
                following={following}
              />
            )}
            {activeSection === 2 && (
              <Followers
                total={data.followers}
                user={data.login}
                onFetchFollowers={(followers) => setFollowers(followers)}
                followers={followers}
              />
            )}
          </ContentUser>
        </Content>
      </Wrapper>
    </Root>
  );
};

User.propTypes = {
  data: dataModel,
  onBackFinder: PropTypes.func,
};

export default User;
