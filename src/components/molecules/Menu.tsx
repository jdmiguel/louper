import { useState } from 'react';

/* material-ui */

import ReposIcon from '@mui/icons-material/Folder';
import FollowingIcon from '@mui/icons-material/Visibility';
import FollowersIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';

/* styles */
import { MenuRoot, MenuTabs, MenuTab } from './styles';

const Menu = ({ onClick }: { onClick: any }) => {
  const [activeMenuItem, setActiveMenuItem] = useState(0);

  return (
    <MenuRoot>
      <MenuTabs
        value={activeMenuItem}
        onChange={(_event: any, tabValue) => {
          onClick(tabValue);
          setActiveMenuItem(tabValue);
        }}
        centered
      >
        <MenuTab icon={<ReposIcon />} disableRipple label={<span>REPOS</span>} wrapped />
        <MenuTab icon={<FollowingIcon />} disableRipple label={<span>FOLLOWING</span>} wrapped />
        <MenuTab icon={<FollowersIcon />} disableRipple label={<span>FOLLOWERS</span>} wrapped />
        <MenuTab icon={<SearchIcon />} disableRipple label={<span>SEARCH</span>} wrapped />
      </MenuTabs>
    </MenuRoot>
  );
};

export default Menu;
