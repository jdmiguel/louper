import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { styled, ThemeProvider } from '@mui/material/styles';
import Intro from './Intro';
import User from './User';
import { theme } from '@/utils/theme';
import { colors } from '@/utils/colors';
import { UserData } from '@/utils/types';

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
          <User userData={userData} onBackFinder={() => setUserData(null)} />
        ) : (
          <Intro onFetchUser={(userData: UserData) => setUserData(userData)} />
        )}
      </Root>
    </ThemeProvider>
  );
};

export default App;
