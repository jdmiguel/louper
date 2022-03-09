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

const UserProfileWrapper = styled('div')({
  display: 'none',
  margin: '60px 50px 0 0',
  '@media (min-width: 768px)': {
    display: 'block',
  },
});

enum DefaultValues {
  totalItemsAllowed = 100,
}

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
        userData.public_repos <= DefaultValues.totalItemsAllowed
          ? userData.public_repos
          : DefaultValues.totalItemsAllowed,
      following:
        userData.following <= DefaultValues.totalItemsAllowed
          ? userData.following
          : DefaultValues.totalItemsAllowed,
      followers:
        userData.followers <= DefaultValues.totalItemsAllowed
          ? userData.followers
          : DefaultValues.totalItemsAllowed,
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
        <UserProfileWrapper data-testid="userProfile">
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
          <UserProfileMobile data-testid="userProfileMobile" userData={userData} />
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
                onRequestError={handleRequestError}
              />
            )}
            {activeSection === 1 && (
              <UserSection
                userName={userData.login}
                sectionType="following"
                totalItems={totalItems.following}
                onRequestError={handleRequestError}
              />
            )}
            {activeSection === 2 && (
              <UserSection
                userName={userData.login}
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
