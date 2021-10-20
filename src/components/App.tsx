import { useState } from 'react';

/* pages */
import HomePage from './pages/Home';
import UserPage from './pages/User';

/* types */
import { User } from '../utils/types';

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <>
      {user ? (
        <UserPage user={user} onBackFinder={() => setUser(null)} />
      ) : (
        <HomePage onFetchUser={(user: User) => setUser(user)} />
      )}
    </>
  );
};

export default App;
