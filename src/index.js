import React from 'react';
import ReactDOM from 'react-dom';

/* material-ui */
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

/* components */
import App from './components/App';

/* utils */
import { theme } from './utils/theme';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root'),
);
