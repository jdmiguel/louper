import LinearProgress from '@mui/material/LinearProgress';
import Menu from './Menu';
import Toast from '../shared/Toast';
import Footer from '../shared/Footer';
import Profile from './Profile';
import ProfileMobile from './ProfileMobile';
import Section from './Section';
import { UserData } from '@/utils/types';
import useUserPage from '@/hooks/useUserPage';
import useUserItems from '@/hooks/useUserItems';
import {
  StyledRoot,
  StyledMain,
  StyledLoaderWrapper,
  StyledProfileWrapper,
  StyledDataWrapper,
} from './styles';

type Props = {
  userData: UserData;
  onBackFinder: () => void;
};

const UserPage = ({ userData, onBackFinder }: Props) => {
  const { public_repos: userRepos, following: userFollowing, followers: userFollowers } = userData;

  const { itemsType, currentPage, itemsPerPage, totalPages, onNextPage, onClickTab } = useUserPage({
    userRepos,
    userFollowing,
    userFollowers,
    onBackFinder,
  });

  const { isLoading, items, areAllItemsLoaded, errorMessage, resetItems, resetErrorMessage } =
    useUserItems({
      userName: userData.login,
      itemsType,
      totalPages,
      currentPage,
      itemsPerPage,
    });

  const onClick = (selectedTab: number) => {
    resetItems();
    onClickTab(selectedTab);
  };

  return (
    <StyledRoot>
      <StyledMain>
        {isLoading && (
          <StyledLoaderWrapper>
            <LinearProgress />
          </StyledLoaderWrapper>
        )}
        <StyledProfileWrapper data-testid="profile">
          <Profile userData={userData} />
        </StyledProfileWrapper>
        <StyledDataWrapper>
          <ProfileMobile data-testid="profile-mobile" userData={userData} />
          <Menu onClick={onClick} />
          <Section
            isLoading={isLoading}
            itemsType={itemsType}
            items={items}
            areAllItemsLoaded={areAllItemsLoaded}
            onNextPage={onNextPage}
          />
        </StyledDataWrapper>
        <Toast isOpen={Boolean(errorMessage)} msg={errorMessage} onClose={resetErrorMessage} />
      </StyledMain>
      <Footer />
    </StyledRoot>
  );
};

export default UserPage;
