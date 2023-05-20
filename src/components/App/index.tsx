import { ErrorBoundary } from 'react-error-boundary';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { ViewContextProvider } from '@/contexts/ViewContext';
import { UserContextProvider } from '@/contexts/UserContext';
import FallbackApp from './FallbackApp';
import { theme } from '@/utils/theme';
import Root from './Root';

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <ErrorBoundary FallbackComponent={FallbackApp}>
      <ViewContextProvider>
        <UserContextProvider>
          <Root />
        </UserContextProvider>
      </ViewContextProvider>
    </ErrorBoundary>
  </ThemeProvider>
);

export default App;
