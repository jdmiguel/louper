import { useState } from 'react';
import {
  TOTAL_USER_ITEMS_ALLOWED,
  TAB,
  USER_ITEMS_TYPE,
  REPOS_PER_PAGE,
  RELATED_USERS_PER_PAGE,
} from '@/utils/literals';

type UseUserPageParams = {
  userRepos: number;
  userFollowing: number;
  userFollowers: number;
  onBackHome: () => void;
};

const useUserPage = ({
  userRepos,
  userFollowing,
  userFollowers,
  onBackHome,
}: UseUserPageParams) => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const getItemsType = () => {
    switch (activeTab) {
      case TAB.repos:
      default:
        return USER_ITEMS_TYPE.repos;
      case TAB.following:
        return USER_ITEMS_TYPE.following;
      case TAB.followers:
        return USER_ITEMS_TYPE.followers;
    }
  };

  const getTotalItemsPerType = () => {
    switch (itemsType) {
      case USER_ITEMS_TYPE.repos:
      default:
        return userRepos <= TOTAL_USER_ITEMS_ALLOWED ? userRepos : TOTAL_USER_ITEMS_ALLOWED;
      case USER_ITEMS_TYPE.following:
        return userFollowing <= TOTAL_USER_ITEMS_ALLOWED ? userFollowing : TOTAL_USER_ITEMS_ALLOWED;
      case USER_ITEMS_TYPE.followers:
        return userFollowers <= TOTAL_USER_ITEMS_ALLOWED ? userFollowers : TOTAL_USER_ITEMS_ALLOWED;
    }
  };

  const itemsType = getItemsType();
  const itemsPerPage =
    itemsType === USER_ITEMS_TYPE.repos ? REPOS_PER_PAGE : RELATED_USERS_PER_PAGE;
  const totalItemsPerType = getTotalItemsPerType();
  const totalPages = Math.ceil(totalItemsPerType / itemsPerPage);

  const onNextPage = () => setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);

  const onClickTab = (selectedTab: number) => {
    if (selectedTab === TAB.search) {
      onBackHome();
      return;
    }
    setActiveTab(selectedTab);
    setCurrentPage(1);
  };

  return {
    itemsType,
    itemsPerPage,
    currentPage,
    totalPages,
    onNextPage,
    onClickTab,
  };
};

export default useUserPage;
