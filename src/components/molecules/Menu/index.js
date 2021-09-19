import { useState } from 'react';
import PropTypes from 'prop-types';

/* material-ui */
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import UserIcon from '@material-ui/icons/Person';
import ReposIcon from '@material-ui/icons/Folder';
import FollowingIcon from '@material-ui/icons/Visibility';
import FollowersIcon from '@material-ui/icons/Favorite';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  '@keyframes topIn': theme.animation.topIn,
  wrapper: {
    backgroundColor: theme.palette.text.light,
    color: theme.palette.secondary.light,
    animation: '$topIn 500ms ease-out forwards',
    transform: 'translateY(-150px)',
  },
}));

const StyledTabs = withStyles((theme) => ({
  flexContainer: {
    '@media (max-width: 768px)': {
      justifyContent: 'space-around',
    },
  },
  indicator: {
    backgroundColor: theme.palette.primary.main,
    height: 2,
    maxWidth: 100,
    transform: 'translateX(calc(50% - 20px))',
  },
}))((props) => <Tabs {...props} />);

const StyledTab = withStyles((theme) => ({
  root: {
    '@media (max-width: 768px)': {
      minWidth: 'auto',
    },
  },
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    '& svg': {
      fill: theme.palette.primary.dark,
      marginBottom: '2px !important',
      width: 22,
    },
    '& > span': {
      color: theme.palette.primary.dark,
      display: 'none',
      '@media (min-width: 768px)': {
        display: 'inline',
      },
    },
    '&:hover': {
      '& svg': {
        fill: theme.palette.primary.light,
      },
    },
  },
  labelIcon: {
    fontSize: 14,
  },
}))((props) => <Tab {...props} />);

const Menu = ({ withRepos, withFollowing, withFollowers, onClick }) => {
  const classes = useStyles();

  const [activeMenuItem, setActiveMenuItem] = useState(0);

  return (
    <div className={classes.wrapper}>
      <StyledTabs
        data-test="menu-tabs"
        value={activeMenuItem}
        onChange={(event, tabValue) => {
          onClick(tabValue);
          setActiveMenuItem(tabValue);
        }}
        centered
      >
        <StyledTab
          data-test="menu-tab-profile"
          icon={<UserIcon />}
          disableRipple
          label={<span>PROFILE</span>}
          wrapped
        />
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
    </div>
  );
};

Menu.propTypes = {
  withRepos: PropTypes.bool,
  withFollowing: PropTypes.bool,
  withFollowers: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default Menu;
