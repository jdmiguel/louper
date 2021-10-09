import { useState } from 'react';

/* material-ui */
import { styled } from '@mui/material/styles';

/* pages */
import Home from './pages/Home';
import User from './pages/User';

const App = () => {
  const [userData, setUserData] = useState(null);
  const [hasSelectedUser, setHasSelectedUser] = useState(false);

  return (
    <>
      {hasSelectedUser ? (
        <User
          data={userData}
          onBackFinder={() => {
            setUserData(null);
            setHasSelectedUser(false);
          }}
        />
      ) : (
        <Home
          onFetchUser={(data) => {
            setUserData(data);
            setHasSelectedUser(true);
          }}
        />
      )}
    </>
  );
};

export default App;
