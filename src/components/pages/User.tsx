import { useState } from 'react';

/* material-ui */
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

/* organisms */
import Profile from '../organisms/Profile';
import ProfileMobile from '../organisms/ProfileMobile';
import UserSection from '../organisms/UserSection';

/* molecules */
import Menu from '../molecules/Menu';

/* services */
import { getRepos, getFollowing, getFollowers } from '../../services/github';

/* types */
import { User, Repo, RelatedUser } from '../../utils/types';

const Root = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  padding: '0 20px 50px',
  '@media (min-width: 769px)': {
    padding: '0 30px 50px',
  },
});

const ProfileWrapper = styled('aside')({
  margin: '60px 40px 0 0',
  '@media (max-width: 768px)': {
    display: 'none',
  },
});

const SectionWrapper = styled('main')({
  display: 'grid',
  gridGap: 20,
  marginTop: 30,
  padding: 1,
  '@media (min-width: 992px)': {
    gridTemplateColumns: 'repeat(2, 330px)',
  },
  '@media (min-width: 1200px)': {
    gridTemplateColumns: 'repeat(2, 420px)',
  },
});

const relatedUsersRequest = {
  repos: getRepos,
  following: getFollowing,
  followers: getFollowers,
};

type Item = Repo | RelatedUser;
type Props = {
  user: User;
  onBackFinder: () => void;
};

const UserPage = ({ user, onBackFinder }: Props) => {
  const [activeSection, setActiveUserSection] = useState(0);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [following, setFollowing] = useState<RelatedUser[]>([]);
  const [followers, setFollowers] = useState<RelatedUser[]>([]);

  return (
    <Root>
      <ProfileWrapper>
        <Profile user={user} />
      </ProfileWrapper>
      <Stack
        sx={{
          '@media (max-width: 992px)': {
            width: '100%',
          },
        }}
      >
        <ProfileMobile user={user} />
        <Menu
          onClick={(section: number) => {
            setActiveUserSection(section);
            if (section === 3) {
              onBackFinder();
            }
          }}
        />
        <SectionWrapper>
          {activeSection === 0 && (
            <UserSection
              type="REPO"
              total={user.public_repos}
              userName={user.login}
              items={repos}
              request={relatedUsersRequest.repos}
              onFetch={(repos: Item[]) => setRepos(repos as Repo[])}
              emptyMsg="No repos added"
            />
          )}
          {activeSection === 1 && (
            <UserSection
              type="RELATED_USER"
              total={user.following}
              userName={user.login}
              items={following}
              request={relatedUsersRequest.following}
              onFetch={(items: Item[]) => setFollowing(items as RelatedUser[])}
              emptyMsg="No followers added"
            />
          )}
          {activeSection === 2 && (
            <UserSection
              type="RELATED_USER"
              total={user.followers}
              userName={user.login}
              items={followers}
              request={relatedUsersRequest.followers}
              onFetch={(items: Item[]) => setFollowers(items as RelatedUser[])}
              emptyMsg="No following added"
            />
          )}
        </SectionWrapper>
      </Stack>
    </Root>
  );
};

export default UserPage;
