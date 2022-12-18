import { useState, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Menu from './Menu';
import Toast from '../shared/Toast';
import Footer from '../shared/Footer';
import Profile from './Profile';
import ProfileMobile from './ProfileMobile';
import Section from './Section';
import { UserData } from '@/utils/types';

const TOTAL_ITEMS_ALLOWED = 100;
enum ActiveSection {
  repos,
  following,
  followers,
}

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

const ProfileWrapper = styled('div')({
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
  const [activeSection, setActiveUserSection] = useState(0);
  const [isErrorToastOpen, setIsErrorToastOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const totalItems = useMemo(
    () => ({
      repos:
        userData.public_repos <= TOTAL_ITEMS_ALLOWED ? userData.public_repos : TOTAL_ITEMS_ALLOWED,
      following:
        userData.following <= TOTAL_ITEMS_ALLOWED ? userData.following : TOTAL_ITEMS_ALLOWED,
      followers:
        userData.followers <= TOTAL_ITEMS_ALLOWED ? userData.followers : TOTAL_ITEMS_ALLOWED,
    }),
    [userData],
  );

  const handleRequestError = (errorMessage: string) => {
    setErrorMessage(errorMessage);
    setIsErrorToastOpen(true);
  };

  return (
    <Root>
      <Main>
        <ProfileWrapper data-testid="profile">
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
          <ProfileMobile data-testid="profile-mobile" userData={userData} />
          <Menu
            onClick={(section: number) => {
              setActiveUserSection(section);
              if (section === 3) {
                onBackFinder();
              }
            }}
          />
          <>
            {activeSection === ActiveSection.repos && (
              <Section
                userLogin={userData.login}
                sectionType="repos"
                totalItems={totalItems.repos}
                onRequestError={handleRequestError}
              />
            )}
            {activeSection === ActiveSection.following && (
              <Section
                userLogin={userData.login}
                sectionType="following"
                totalItems={totalItems.following}
                onRequestError={handleRequestError}
              />
            )}
            {activeSection === ActiveSection.followers && (
              <Section
                userLogin={userData.login}
                sectionType="followers"
                totalItems={totalItems.followers}
                onRequestError={handleRequestError}
              />
            )}
          </>
        </Stack>
        <Toast
          isOpen={isErrorToastOpen}
          msg={errorMessage}
          onClose={() => setIsErrorToastOpen(false)}
        />
      </Main>
      <Footer />
    </Root>
  );
};

export default UserPage;
