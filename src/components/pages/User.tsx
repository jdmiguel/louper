import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Menu from '../molecules/Menu';
import Toast from '../molecules/Toast';
import Footer from '../molecules/Footer';
import Profile from '../organisms/Profile';
import ProfileMobile from '../organisms/ProfileMobile';
import Repos from '../organisms/Repos';
import Following from '../organisms/Following';
import Followers from '../organisms/Followers';
import { Repo, User, UserData } from '../../utils/types';

const Root = styled('div')({
  minHeight: '100vh',
  padding: '0 20px',
  position: 'relative',
});

const Main = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  paddingBottom: 40,
  '@media (min-width: 768px)': {
    paddingBottom: 74,
  },
});

const ProfileWrapper = styled('aside')({
  display: 'none',
  margin: '60px 50px 0 0',
  '@media (min-width: 768px)': {
    display: 'block',
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
      <Main>
        <ProfileWrapper>
          <Profile userData={userData} />
        </ProfileWrapper>
        <Stack
          sx={{
            width: '100%',
            '@media (min-width: 992px)': {
              width: 'initial',
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
      </Main>
      <Footer />
    </Root>
  );
};

export default UserPage;
