import { useState } from 'react';

/* material-ui */
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

/* molecules */
import Menu from '../molecules/Menu';
import Toast from '../molecules/Toast';

/* organisms */
import Profile from '../organisms/Profile';
import ProfileMobile from '../organisms/ProfileMobile';
import Repos from '../organisms/Repos';
import Following from '../organisms/Following';
import Followers from '../organisms/Followers';

/* types */
import { Repo, User, UserData } from '../../utils/types';

const Root = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  padding: '0 20px 50px',
  '@media (min-width: 768px)': {
    padding: '0 30px 50px',
  },
});

const ProfileWrapper = styled('aside')({
  margin: '60px 40px 0 0',
  '@media (max-width: 768px)': {
    display: 'none',
  },
});

type Props = {
  userData: UserData;
  onBackFinder: () => void;
};

const UserPage = ({ userData, onBackFinder }: Props) => {
  const [isErrorToastOpen, setIsErrorToastOpen] = useState(false);
  const [activeSection, setActiveUserSection] = useState(0);
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [following, setFollowing] = useState<User[] | null>(null);
  const [followers, setFollowers] = useState<User[] | null>(null);

  return (
    <Root>
      <ProfileWrapper>
        <Profile userData={userData} />
      </ProfileWrapper>
      <Stack
        sx={{
          '@media (max-width: 992px)': {
            width: '100%',
          },
        }}
      >
        <ProfileMobile userData={userData} />
        <Menu
          onClick={(section: number) => {
            setActiveUserSection(section);
            if (section === 3) {
              onBackFinder();
            }
          }}
        />
        <>
          {activeSection === 0 && (
            <Repos
              userName={userData.login}
              repos={repos}
              totalRepos={userData.public_repos}
              onFetchRepos={(fetchedRepos: Repo[]) => setRepos(fetchedRepos)}
              onRequestError={() => setIsErrorToastOpen(true)}
            />
          )}
          {activeSection === 1 && (
            <Following
              userName={userData.login}
              following={following}
              totalFollowing={userData.following}
              onFetchFollowing={(fetchedFollowing: User[]) => setFollowing(fetchedFollowing)}
              onRequestError={() => setIsErrorToastOpen(true)}
            />
          )}
          {activeSection === 2 && (
            <Followers
              userName={userData.login}
              followers={followers}
              totalFollowers={userData.followers}
              onFetchFollowers={(fetchedFollowers: User[]) => setFollowers(fetchedFollowers)}
              onRequestError={() => setIsErrorToastOpen(true)}
            />
          )}
        </>
      </Stack>
      <Toast
        isOpen={isErrorToastOpen}
        type="error"
        msg="Sorry! there was an error on the server side."
        onClose={() => setIsErrorToastOpen(false)}
      />
    </Root>
  );
};

export default UserPage;
