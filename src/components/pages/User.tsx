import { useState } from 'react';

/* organisms */
import Profile from '../organisms/Profile';
import ProfileMobile from '../organisms/ProfileMobile';
import RepoSection from '../organisms/Repos';
import FollowerSection from '../organisms/Followers';
import FollowingSection from '../organisms/Following';

/* molecules */
import Menu from '../molecules/Menu';

/* types */
import { User, Repo, RelatedUser } from '../../utils/types';

/* styles */
import { UserRoot, UserProfile, UserContent, UserSection } from './styles';

type Props = {
  user: User;
  onBackFinder: () => void;
};

const UserPage = ({ user, onBackFinder }: Props) => {
  const [activeSection, setActiveUserSection] = useState(0);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [following, setFollowing] = useState<RelatedUser[]>([]);
  const [followers, setFollowers] = useState<RelatedUser[]>([]);

  return (
    <UserRoot>
      <UserProfile>
        <Profile user={user} />
      </UserProfile>
      <UserContent>
        <ProfileMobile user={user} />
        <Menu
          onClick={(section: number) => {
            setActiveUserSection(section);
            if (section === 3) {
              onBackFinder();
            }
          }}
        />
        <UserSection>
          {activeSection === 0 && (
            <RepoSection
              total={user.public_repos}
              userName={user.login}
              onFetchRepos={(repos: Repo[]) => setRepos(repos)}
              repos={repos}
            />
          )}
          {activeSection === 1 && (
            <FollowingSection
              total={user.following}
              userName={user.login}
              onFetchFollowing={(following: RelatedUser[]) => setFollowing(following)}
              following={following}
            />
          )}
          {activeSection === 2 && (
            <FollowerSection
              total={user.followers}
              userName={user.login}
              onFetchFollowers={(followers: RelatedUser[]) => setFollowers(followers)}
              followers={followers}
            />
          )}
        </UserSection>
      </UserContent>
    </UserRoot>
  );
};

export default UserPage;
