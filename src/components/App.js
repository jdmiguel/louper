import { useState } from 'react';

/* pages */
import Home from './pages/Home';
import User from './pages/User';

/* molecules */
import Footer from './molecules/Footer';

const App = () => {
  const [userData, setUserData] = useState(null);
  const [hasSelectedUser, setHasSelectedUser] = useState(false);

  return (
    <>
      {hasSelectedUser ? (
        <User
          data-test="app-userContent"
          data={userData}
          onBackFinder={() => {
            setUserData(null);
            setHasSelectedUser(false);
          }}
        />
      ) : (
        <Home
          data-test="app-finder"
          onFetchUser={(data) => {
            setUserData(data);
            setHasSelectedUser(true);
          }}
        />
      )}
      <Footer data-test="app-footer" />
    </>
  );
};

export default App;
