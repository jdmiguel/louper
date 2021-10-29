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
import { User } from '../utils/types';

export type ThemeMode = 'light' | 'dark';

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  return (
    <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      {user ? (
        <UserPage user={user} onBackFinder={() => setUser(null)} />
      ) : (
        <HomePage
          onFetchUser={(user: User) => setUser(user)}
          changeTheme={(themeMode: ThemeMode) => setThemeMode(themeMode)}
        />
      )}
    </ThemeProvider>
  );
};

export default App;
