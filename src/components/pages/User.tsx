import { useState, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Menu from '../molecules/Menu';
import Toast from '../molecules/Toast';
import Footer from '../molecules/Footer';
import UserProfile from '../organisms/UserProfile';
import UserProfileMobile from '../organisms/UserProfileMobile';
import UserSection from '../organisms/UserSection';
import { UserData } from '../../utils/types';

const TOTAL_ITEMS_ALLOWED = 100;

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

const UserProfileWrapper = styled('aside')({
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

  return (
    <Root>
      <Main>
        <UserProfileWrapper>
          <UserProfile userData={userData} />
        </UserProfileWrapper>
        <Stack
          sx={{
            width: '100%',
            '@media (min-width: 992px)': {
              width: 'initial',
            },
          }}
        >
          <UserProfileMobile userData={userData} />
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
              <UserSection
                userName={userData.login}
                sectionType="repos"
                totalItems={totalItems.repos}
                onRequestError={() => setIsErrorToastOpen(true)}
              />
            )}
            {activeSection === 1 && (
              <UserSection
                userName={userData.login}
                sectionType="following"
                totalItems={totalItems.following}
                onRequestError={() => setIsErrorToastOpen(true)}
              />
            )}
            {activeSection === 2 && (
              <UserSection
                userName={userData.login}
                sectionType="followers"
                totalItems={totalItems.followers}
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
