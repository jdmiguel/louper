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

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLightTheme, setIsLightTheme] = useState(true);

  return (
    <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
      <CssBaseline />
      {user ? (
        <UserPage user={user} onBackFinder={() => setUser(null)} />
      ) : (
        <HomePage
          onFetchUser={(user: User) => setUser(user)}
          changeTheme={(isLightTheme: boolean) => setIsLightTheme(isLightTheme)}
        />
      )}
    </ThemeProvider>
  );
};

export default App;
