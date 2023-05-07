import { useState } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Intro from '../Intro';
import User from '../User';
import { theme } from '@/utils/theme';
import { ERROR_MESSAGE_HEADING } from '@/utils/literals';
import { UserData } from '@/utils/types';
import { StyledFallbackAppRoot, StyledErrorMessage, StyledAppRoot } from './styles';

const FallbackApp = ({ error }: FallbackProps) => (
  <StyledFallbackAppRoot>
    <p>{ERROR_MESSAGE_HEADING}</p>
    <StyledErrorMessage>{error.message}</StyledErrorMessage>
  </StyledFallbackAppRoot>
);

const App = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary FallbackComponent={FallbackApp}>
        <StyledAppRoot>
          {userData ? (
            <User userData={userData} onBackFinder={() => setUserData(null)} />
          ) : (
            <Intro onFetchUser={(userData: UserData) => setUserData(userData)} />
          )}
        </StyledAppRoot>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
