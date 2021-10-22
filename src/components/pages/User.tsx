import { useState } from 'react';

/* organisms */
import Profile from '../organisms/Profile';
import ProfileMobile from '../organisms/ProfileMobile';
import UserSection from '../organisms/UserSection';

/* molecules */
import Menu from '../molecules/Menu';

/* services */
import { getRepos, getFollowing, getFollowers } from '../../services/github';

/* types */
import { User, Repo, RelatedUser } from '../../utils/types';

/* styles */
import { UserRoot, UserProfile, UserContent, UserSectionWrapper } from './styles';

const relatedUsersRequest = {
  repos: getRepos,
  following: getFollowing,
  followers: getFollowers,
};

type Item = Repo | RelatedUser;
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
        <UserSectionWrapper>
          {activeSection === 0 && (
            <UserSection
              type="REPO"
              total={user.public_repos}
              userName={user.login}
              items={repos}
              request={relatedUsersRequest.repos}
              onFetch={(repos: Item[]) => setRepos(repos as Repo[])}
              emptyMsg="No repos added"
            />
          )}
          {activeSection === 1 && (
            <UserSection
              type="RELATED_USER"
              total={user.following}
              userName={user.login}
              items={following}
              request={relatedUsersRequest.followers}
              onFetch={(items: Item[]) => setFollowing(items as RelatedUser[])}
              emptyMsg="No followers added"
            />
          )}
          {activeSection === 2 && (
            <UserSection
              type="RELATED_USER"
              total={user.followers}
              userName={user.login}
              items={followers}
              request={relatedUsersRequest.following}
              onFetch={(items: Item[]) => setFollowers(items as RelatedUser[])}
              emptyMsg="No following added"
            />
          )}
        </UserSectionWrapper>
      </UserContent>
    </UserRoot>
  );
};

export default UserPage;
