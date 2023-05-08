import { useState, useMemo } from 'react';
import Menu from './Menu';
import Toast from '../shared/Toast';
import Footer from '../shared/Footer';
import Profile from './Profile';
import ProfileMobile from './ProfileMobile';
import Section from './Section';
import { TOTAL_USER_ITEMS_ALLOWED, TAB, SECTION_TYPE } from '@/utils/literals';
import { UserData, SectionType } from '@/utils/types';
import { StyledRoot, StyledMain, StyledProfileWrapper, StyledDataWrapper } from './styles';

type Props = {
  userData: UserData;
  onBackFinder: () => void;
};

const UserPage = ({ userData, onBackFinder }: Props) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isErrorToastOpen, setIsErrorToastOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const totalItems = useMemo(
    () => ({
      repos:
        userData.public_repos <= TOTAL_USER_ITEMS_ALLOWED
          ? userData.public_repos
          : TOTAL_USER_ITEMS_ALLOWED,
      following:
        userData.following <= TOTAL_USER_ITEMS_ALLOWED
          ? userData.following
          : TOTAL_USER_ITEMS_ALLOWED,
      followers:
        userData.followers <= TOTAL_USER_ITEMS_ALLOWED
          ? userData.followers
          : TOTAL_USER_ITEMS_ALLOWED,
    }),
    [userData],
  );

  const handleRequestError = (errorMessage: string) => {
    setErrorMessage(errorMessage);
    setIsErrorToastOpen(true);
  };

  const handleClickTab = (selectedTab: number) => {
    if (selectedTab === 3) {
      onBackFinder();
      return;
    }
    setActiveTab(selectedTab);
  };

  return (
    <StyledRoot>
      <StyledMain>
        <StyledProfileWrapper data-testid="profile">
          <Profile userData={userData} />
        </StyledProfileWrapper>
        <StyledDataWrapper
          sx={{
            width: '100%',
            '@media (min-width: 992px)': {
              width: 'initial',
            },
          }}
        >
          <ProfileMobile data-testid="profile-mobile" userData={userData} />
          <Menu onClick={handleClickTab} />
          <>
            {activeTab === TAB.repos && (
              <Section
                userLogin={userData.login}
                sectionType={SECTION_TYPE.repos as SectionType}
                totalItems={totalItems.repos}
                onRequestError={handleRequestError}
              />
            )}
            {activeTab === TAB.following && (
              <Section
                userLogin={userData.login}
                sectionType={SECTION_TYPE.following as SectionType}
                totalItems={totalItems.following}
                onRequestError={handleRequestError}
              />
            )}
            {activeTab === TAB.followers && (
              <Section
                userLogin={userData.login}
                sectionType={SECTION_TYPE.followers as SectionType}
                totalItems={totalItems.followers}
                onRequestError={handleRequestError}
              />
            )}
          </>
        </StyledDataWrapper>
        <Toast
          isOpen={isErrorToastOpen}
          msg={errorMessage}
          onClose={() => setIsErrorToastOpen(false)}
        />
      </StyledMain>
      <Footer />
    </StyledRoot>
  );
};

export default UserPage;
