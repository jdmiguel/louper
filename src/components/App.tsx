import { useState } from 'react';

/* material-ui */
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

/* pages */
import HomePage from './pages/Home';
import UserPage from './pages/User';

/* utils */
import { lightTheme, darkTheme } from '../utils/themes';

/* types */
import { UserData } from '../utils/types';

export type ThemeMode = 'light' | 'dark';

const App = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  return (
    <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      {userData ? (
        <UserPage userData={userData} onBackFinder={() => setUserData(null)} />
      ) : (
        <HomePage
          onFetchUser={(userData: UserData) => setUserData(userData)}
          changeTheme={(themeMode: ThemeMode) => setThemeMode(themeMode)}
        />
      )}
    </ThemeProvider>
  );
};

export default App;
