import { useState } from 'react';

/* organisms */
import Profile from '../organisms/Profile';
import ProfileMobile from '../organisms/ProfileMobile';
import RepoSection from '../organisms/Repos';
import RelatedUsers from '../organisms/RelatedUsers';

/* molecules */
import Menu from '../molecules/Menu';

/* services */
import { getFollowing, getFollowers } from '../../services/github';

/* types */
import { User, Repo, RelatedUser } from '../../utils/types';

/* styles */
import { UserRoot, UserProfile, UserContent, UserSection } from './styles';

const relatedUsersRequest = {
  following: getFollowing,
  followers: getFollowers,
};

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
              repos={repos}
              onFetchRepos={(repos: Repo[]) => setRepos(repos)}
            />
          )}
          {activeSection === 1 && (
            <RelatedUsers
              total={user.following}
              userName={user.login}
              relatedUsers={following}
              relatedUserRequest={relatedUsersRequest.followers}
              onFetchRelatedUsers={(following: RelatedUser[]) => setFollowing(following)}
            />
          )}
          {activeSection === 2 && (
            <RelatedUsers
              total={user.followers}
              userName={user.login}
              relatedUsers={followers}
              relatedUserRequest={relatedUsersRequest.following}
              onFetchRelatedUsers={(followers: RelatedUser[]) => setFollowers(followers)}
            />
          )}
        </UserSection>
      </UserContent>
    </UserRoot>
  );
};

export default UserPage;
