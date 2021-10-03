import { useState } from 'react';

/* material-ui */
import { styled } from '@mui/material/styles';

/* pages */
import Home from './pages/Home';
import User from './pages/User';

/* molecules */
import Footer from './molecules/Footer';

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: '100vh',
  position: 'relative',
});

const App = () => {
  const [userData, setUserData] = useState(null);
  const [hasSelectedUser, setHasSelectedUser] = useState(false);

  return (
    <Root>
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
    </Root>
  );
};

export default App;
