import { useState } from 'react';

/* material-ui */
import { styled } from '@mui/material/styles';

/* pages */
import Home from './pages/Home';
import User from './pages/User';

/* molecules */
import Header from './molecules/Header';
import Footer from './molecules/Footer';

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '100vh',
});

const App = () => {
  const [userData, setUserData] = useState(null);
  const [hasSelectedUser, setHasSelectedUser] = useState(false);
  const [activeUserSection, setActiveUserSection] = useState(0);

  return (
    <Root>
      <Header
        showMenu={hasSelectedUser}
        data={userData}
        activeSection={activeUserSection}
        onActiveSection={(section) => setActiveUserSection(section)}
        onBackFinder={() => {
          setUserData(null);
          setHasSelectedUser(false);
          setActiveUserSection(0);
        }}
      />
      {hasSelectedUser ? (
        <User data={userData} activeSection={activeUserSection} />
      ) : (
        <Home
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
