import { SyntheticEvent, useState } from 'react';

/* material-ui */
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ReposIcon from '@mui/icons-material/Folder';
import FollowingIcon from '@mui/icons-material/Visibility';
import FollowersIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';

const Root = styled('header')({
  position: 'sticky',
  top: 0,
  zIndex: 1,
});

const StyledTabs = styled(Tabs)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  borderBottom: `1px solid ${theme.palette.secondary.light}`,
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
  '& .MuiSvgIcon-root': {
    fill: theme.palette.primary.main,
    marginBottom: '2px !important',
    transition: 'fill ease-out 250ms',
    width: 22,
    '& + span': {
      color: theme.palette.primary.main,
      display: 'none',
      fontSize: '0.9rem',
      transition: 'color ease-out 250ms',
      '@media (min-width: 992px)': {
        display: 'initial',
      },
    },
  },
  '&:hover': {
    '& .MuiSvgIcon-root': {
      fill: theme.palette.primary.light,
      '& + span': { color: theme.palette.primary.light },
    },
  },
}));

type Props = {
  onClick: (selectedSection: number) => void;
};

const Menu = ({ onClick }: Props) => {
  const [activeMenuItem, setActiveMenuItem] = useState(0);

  return (
    <Root>
      <StyledTabs
        value={activeMenuItem}
        onChange={(_event: SyntheticEvent, selectedSection) => {
          onClick(selectedSection);
          setActiveMenuItem(selectedSection);
        }}
        centered
      >
        <StyledTab icon={<ReposIcon />} disableRipple label={<span>REPOS</span>} wrapped />
        <StyledTab icon={<FollowingIcon />} disableRipple label={<span>FOLLOWING</span>} wrapped />
        <StyledTab icon={<FollowersIcon />} disableRipple label={<span>FOLLOWERS</span>} wrapped />
        <StyledTab icon={<SearchIcon />} disableRipple label={<span>SEARCH</span>} wrapped />
      </StyledTabs>
    </Root>
  );
};

export default Menu;
