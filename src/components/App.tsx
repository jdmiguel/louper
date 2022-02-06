import { useState } from 'react';

/* material-ui */
import CssBaseline from '@mui/material/CssBaseline';
import { styled, ThemeProvider } from '@mui/material/styles';

/* pages */
import HomePage from './pages/Home';
import UserPage from './pages/User';

/* utils */
import { lightTheme, darkTheme } from '../utils/themes';

/* types */
import { UserData } from '../utils/types';

export type ThemeMode = 'light' | 'dark';

const PagesWrapper = styled('div')(({ theme }) => ({
  background:
    theme.palette.mode === 'light'
      ? `radial-gradient(circle, ${theme.palette.background.default} 0%, ${theme.palette.secondary.dark} 100%)`
      : `radial-gradient(circle, ${theme.palette.background.default} 0%, ${theme.palette.secondary.dark} 100%)`,
}));

const App = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  return (
    <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      <PagesWrapper>
        {userData ? (
          <UserPage userData={userData} onBackFinder={() => setUserData(null)} />
        ) : (
          <HomePage
            onFetchUser={(userData: UserData) => setUserData(userData)}
            changeTheme={(themeMode: ThemeMode) => setThemeMode(themeMode)}
          />
        )}
      </PagesWrapper>
    </ThemeProvider>
  );
};

export default App;
