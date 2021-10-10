import { useState } from 'react';
import PropTypes from 'prop-types';

/* material-ui */
import { styled } from '@mui/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ReposIcon from '@mui/icons-material/Folder';
import FollowingIcon from '@mui/icons-material/Visibility';
import FollowersIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';

const StyledTabs = styled(Tabs)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderBottom: `1px solid ${theme.palette.secondary.light}`,
  position: 'sticky',
  top: 0,
  '& .MuiTabs-flexContainer': {
    justifyContent: 'space-between',
    '@media (min-width: 1200x)': {
      justifyContent: 'center',
    },
  },
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
    height: 2,
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  minWidth: 60,
  '@media (min-width: 992px)': {
    minWidth: 120,
  },
  '@media (min-width: 1200px)': {
    minWidth: 200,
  },
  '& svg': {
    fill: theme.palette.primary.dark,
    marginBottom: '2px !important',
    transition: 'fill ease-out 250ms',
    width: 22,
  },
  '& > span': {
    color: theme.palette.primary.dark,
    display: 'none',
    fontSize: '0.9rem',
    transition: 'color ease-out 250ms',
    '@media (min-width: 992px)': {
      display: 'inline',
    },
  },
  '&:hover': {
    '& svg': {
      fill: theme.palette.primary.light,
    },
    '& > span': {
      color: theme.palette.primary.light,
    },
  },
}));

const Menu = ({ withRepos, withFollowing, withFollowers, onClick }) => {
  const [activeMenuItem, setActiveMenuItem] = useState(0);

  return (
    <StyledTabs
      data-test="menu-tabs"
      value={activeMenuItem}
      onChange={(event, tabValue) => {
        onClick(tabValue);
        setActiveMenuItem(tabValue);
      }}
      centered
    >
      {withRepos && (
        <StyledTab
          data-test="menu-tab-repos"
          icon={<ReposIcon />}
          disableRipple
          label={<span>REPOS</span>}
          wrapped
        />
      )}
      {withFollowing && (
        <StyledTab
          data-test="menu-tab-following"
          icon={<FollowingIcon />}
          disableRipple
          label={<span>FOLLOWING</span>}
          wrapped
        />
      )}
      {withFollowers && (
        <StyledTab
          data-test="menu-tab-followers"
          icon={<FollowersIcon />}
          disableRipple
          label={<span>FOLLOWERS</span>}
          wrapped
        />
      )}
      <StyledTab
        data-test="menu-tab-search"
        icon={<SearchIcon />}
        disableRipple
        label={<span>SEARCH</span>}
        wrapped
      />
    </StyledTabs>
  );
};

Menu.propTypes = {
  withRepos: PropTypes.bool,
  withFollowing: PropTypes.bool,
  withFollowers: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default Menu;