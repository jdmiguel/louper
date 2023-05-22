import LinearProgress from '@mui/material/LinearProgress';
import Menu from './Menu';
import Footer from '../shared/Footer';
import Profile from './Profile';
import ProfileMobile from './ProfileMobile';
import Section from './Section';
import { useUser } from '@/contexts/UserContext';
import useUserView from '@/hooks/useUserView';
import useUserItems from '@/hooks/useUserItems';
import {
  StyledRoot,
  StyledMain,
  StyledLoaderWrapper,
  StyledProfileWrapper,
  StyledDataWrapper,
} from './styles';

const UserPage = () => {
  const { user } = useUser();

  const { public_repos: userRepos, following: userFollowing, followers: userFollowers } = user;

  const { itemsType, currentPage, itemsPerPage, totalPages, onNextPage, onClickTab } = useUserView({
    userRepos,
    userFollowing,
    userFollowers,
  });

  const { isLoading, shouldDisplayItems, items, areAllItemsLoaded, resetItems } = useUserItems({
    userName: user.login,
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
          <Profile />
        </StyledProfileWrapper>
        <StyledDataWrapper>
          <ProfileMobile data-testid="profile-mobile" />
          <Menu onClick={onClick} />
          <Section
            isLoading={isLoading}
            shouldDisplayItems={shouldDisplayItems}
            itemsType={itemsType}
            items={items}
            areAllItemsLoaded={areAllItemsLoaded}
            onNextPage={onNextPage}
          />
        </StyledDataWrapper>
      </StyledMain>
      <Footer />
    </StyledRoot>
  );
};

export default UserPage;
