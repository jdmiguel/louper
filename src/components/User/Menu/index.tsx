import { SyntheticEvent, useState } from 'react';
import ReposIcon from '@mui/icons-material/Folder';
import FollowingIcon from '@mui/icons-material/Visibility';
import FollowersIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import { TABS } from '@/utils/literals';
import { StyledRoot, StyledTabs, StyledTab } from './styles';

const [ReposTab, FollowingTab, FollowersTab, SearchTab] = TABS;

type Props = {
  onClick: (selectedSection: number) => void;
};

const Menu = ({ onClick }: Props) => {
  const [activeMenuItem, setActiveMenuItem] = useState(0);

  return (
    <StyledRoot>
      <StyledTabs
        value={activeMenuItem}
        onChange={(_event: SyntheticEvent, selectedSection) => {
          onClick(selectedSection);
          setActiveMenuItem(selectedSection);
        }}
        centered
      >
        <StyledTab icon={<ReposIcon />} disableRipple label={<span>{ReposTab}</span>} wrapped />
        <StyledTab
          icon={<FollowingIcon />}
          disableRipple
          label={<span>{FollowingTab}</span>}
          wrapped
        />
        <StyledTab
          icon={<FollowersIcon />}
          disableRipple
          label={<span>{FollowersTab}</span>}
          wrapped
        />
        <StyledTab icon={<SearchIcon />} disableRipple label={<span>{SearchTab}</span>} wrapped />
      </StyledTabs>
    </StyledRoot>
  );
};

export default Menu;
