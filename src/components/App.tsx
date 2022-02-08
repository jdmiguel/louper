import { useState } from 'react';

/* material-ui */
import CssBaseline from '@mui/material/CssBaseline';
import { styled, ThemeProvider } from '@mui/material/styles';

/* pages */
import HomePage from './pages/Home';
import UserPage from './pages/User';

/* utils */
import { theme } from '../utils/theme';

/* colors */
import { colors } from '../utils/colors';

/* types */
import { UserData } from '../utils/types';

export type ThemeMode = 'light' | 'dark';

const Root = styled('div')({
  background: colors.darkGradient,
  backgroundAttachment: 'fixed',
  minHeight: '100vh',
});

const App = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Root>
        {userData ? (
          <UserPage userData={userData} onBackFinder={() => setUserData(null)} />
        ) : (
          <HomePage onFetchUser={(userData: UserData) => setUserData(userData)} />
        )}
      </Root>
    </ThemeProvider>
  );
};

export default App;
