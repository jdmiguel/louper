import { ReactNode, createContext, useState, useContext } from 'react';
import { useView } from './ViewContext';
import { useErrorMessage } from './ErrorMessageContext';
import { API_BASE_URL, formatRequest } from '@/utils/request';
import { DEFAULT_USER } from '@/utils/literals';
import { User } from '@/utils/types';

const UserContext = createContext({
  isLoading: false,
  user: DEFAULT_USER,
  updateUser: (_: User) => {},
  fetchUser: (_: string) => {},
});

type Props = {
  children: ReactNode;
};

const UserContextProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User>(DEFAULT_USER);

  const { updateView } = useView();

  const { displayErrorMessage, updateErrorMessage } = useErrorMessage();

  const fetchUser = (userName: string) => {
    setIsLoading(true);

    fetch(`${API_BASE_URL}/users/${userName}`)
      .then(formatRequest)
      .then((user: User) => {
        updateView('user');
        setUser({
          login: user.login,
          id: user.id,
          avatar_url: user.avatar_url,
          gravatar_id: user.gravatar_id,
          created_at: user.created_at,
          updated_at: user.updated_at,
          name: user.name,
          bio: user.bio,
          email: user.email,
          location: user.location,
          blog: user.blog,
          company: user.company,
          html_url: user.html_url,
          url: user.url,
          followers_url: user.followers_url,
          following_url: user.following_url,
          gists_url: user.gists_url,
          starred_url: user.starred_url,
          public_repos: user.public_repos,
          subscriptions_url: user.subscriptions_url,
          organizations_url: user.organizations_url,
          repos_url: user.repos_url,
          events_url: user.events_url,
          followers: user.followers,
          following: user.following,
          node_id: user.node_id,
          received_events_url: user.received_events_url,
          type: user.type,
          site_admin: user.site_admin,
          hireable: user.hireable,
          twitter_username: user.twitter_username,
          public_gists: user.public_gists,
        });
      })
      .catch((error) => {
        displayErrorMessage();
        updateErrorMessage(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const updateUser = (currentUser: User) => setUser(currentUser);

  const userContextValue = {
    isLoading,
    user,
    updateUser,
    fetchUser,
  };

  return <UserContext.Provider value={userContextValue}>{children}</UserContext.Provider>;
};

const useUser = () => useContext(UserContext);

export { UserContextProvider, useUser };

export default UserContext;
