import { useState } from 'react';

/* organisms */
import Profile from '../organisms/Profile';
import ProfileMobile from '../organisms/ProfileMobile';
import Repos from '../organisms/Repos';
import Followers from '../organisms/Followers';
import Following from '../organisms/Following';

/* molecules */
import Menu from '../molecules/Menu';

/* styles */
import { UserRoot, UserProfile, UserContent, UserSection } from './styles';

const User = ({ data, onBackFinder }: { data: any; onBackFinder: () => void }) => {
  const [activeSection, setActiveUserSection] = useState(0);
  const [repos, setRepos] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);

  return (
    <UserRoot>
      <UserProfile>
        <Profile data={data} />
      </UserProfile>
      <UserContent>
        <ProfileMobile data={data} />
        <Menu
          onClick={(section: any) => {
            setActiveUserSection(section);
            if (section === 3) {
              onBackFinder();
            }
          }}
        />
        <UserSection>
          {activeSection === 0 && (
            <Repos
              total={data.repos}
              user={data.login}
              onFetchRepos={(repos: any) => setRepos(repos)}
              repos={repos}
            />
          )}
          {activeSection === 1 && (
            <Following
              total={data.following}
              user={data.login}
              onFetchFollowing={(following: any) => setFollowing(following)}
              following={following}
            />
          )}
          {activeSection === 2 && (
            <Followers
              total={data.followers}
              user={data.login}
              onFetchFollowers={(followers: any) => setFollowers(followers)}
              followers={followers}
            />
          )}
        </UserSection>
      </UserContent>
    </UserRoot>
  );
};

export default User;
