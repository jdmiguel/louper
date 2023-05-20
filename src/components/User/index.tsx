import LinearProgress from '@mui/material/LinearProgress';
import Menu from './Menu';
import Footer from '../shared/Footer';
import Profile from './Profile';
import ProfileMobile from './ProfileMobile';
import Section from './Section';
import { useView } from '@/contexts/ViewContext';
import { useUser } from '@/contexts/UserContext';
import useUserPage from '@/hooks/useUserPage';
import useUserItems from '@/hooks/useUserItems';
import {
  StyledRoot,
  StyledMain,
  StyledLoaderWrapper,
  StyledProfileWrapper,
  StyledDataWrapper,
} from './styles';

const UserPage = () => {
  const { updateView } = useView();
  const { user } = useUser();

  const { public_repos: userRepos, following: userFollowing, followers: userFollowers } = user;

  const onBackHome = () => updateView('home');

  const { itemsType, currentPage, itemsPerPage, totalPages, onNextPage, onClickTab } = useUserPage({
    userRepos,
    userFollowing,
    userFollowers,
    onBackHome,
  });

  const { isLoading, items, areAllItemsLoaded, resetItems } = useUserItems({
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
