import { ReactNode, createContext, useState, useContext } from 'react';
import { DEFAULT_USER } from '@/utils/literals';
import { User } from '@/utils/types';

const UserContext = createContext({
  user: DEFAULT_USER,
  updateUser: (_: User) => {},
});

type Props = {
  children: ReactNode;
};

const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User>(DEFAULT_USER);

  const updateUser = (currentUser: User) => setUser(currentUser);

  const userContextValue = {
    user,
    updateUser,
  };

  return <UserContext.Provider value={userContextValue}>{children}</UserContext.Provider>;
};

const useUser = () => useContext(UserContext);

export { UserContextProvider, useUser };

export default UserContext;
