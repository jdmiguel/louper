import { useState } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { useSpring, animated } from '@react-spring/web';
import CssBaseline from '@mui/material/CssBaseline';
import { styled, ThemeProvider } from '@mui/material/styles';
import Intro from './Intro';
import User from './User';
import { theme } from '@/utils/theme';
import { colors } from '@/utils/colors';
import { UserData } from '@/utils/types';

const FallbackApp = ({ error }: FallbackProps) => (
  <div
    role="alert"
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}
  >
    <pre style={{ color: 'white', fontSize: 18, margin: 0 }}>Something went wrong:</pre>
    <pre style={{ color: 'red', fontSize: 16 }}>{error.message}</pre>
  </div>
);

const Root = animated(
  styled('div')({
    background: colors.darkGradient,
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
  }),
);

const App = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  const entryRoot = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      duration: 1200,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary FallbackComponent={FallbackApp}>
        <Root style={entryRoot}>
          {userData ? (
            <User userData={userData} onBackFinder={() => setUserData(null)} />
          ) : (
            <Intro onFetchUser={(userData: UserData) => setUserData(userData)} />
          )}
        </Root>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
