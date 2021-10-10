/* material-ui */
import { keyframes } from '@emotion/react';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          overflowX: 'hidden',
          background: '#E0E6EF',
        },
        body: {
          margin: 0,
          padding: 0,
        },
        button: {
          boxShadow: 'initial !important',
        },
      },
    },
  },
  typography: {
    fontFamily: ['Comfortaa', 'Arial', 'sans-serif'].join(','),
    htmlFontSize: 12,
    h1: {
      color: '#353D40',
      fontSize: '4.8rem',
      fontWeight: 700,
      letterSpacing: '-0.25rem',
      lineHeight: 0,
      '@media (min-width: 769px)': {
        fontSize: '6rem',
      },
    },
    h2: {
      color: '#353D40',
      fontSize: '3.5rem',
      fontWeight: 300,
      letterSpacing: '-0.1rem',
      lineHeight: 0,
      '@media (min-width: 769px)': {
        fontSize: '4.2rem',
      },
    },
    h3: {
      color: '#353D40',
      fontSize: '1.3rem',
      fontWeight: 700,
      '@media (min-width: 769px)': {
        fontSize: '1.5rem',
      },
    },
    h4: {
      color: '#353D40',
      fontSize: '1.1rem',
      fontWeight: 500,
      '@media (min-width: 769px)': {
        fontSize: '1.2rem',
      },
    },
    h5: {
      color: '#6b77a1',
      fontSize: '0.9rem',
      fontWeight: 700,
      textTransform: 'uppercase',
    },
    h6: {
      color: '#757d81',
      fontSize: '0.8rem',
      fontWeight: 500,
      textTransform: 'uppercase',
    },
    button: {
      fontSize: '0.9rem',
    },
    body1: {
      color: '#353D40',
      fontSize: '0.9rem',
      lineHeight: '1.1rem',
    },
    body2: {
      color: '#E1D7EC',
      fontSize: '0.8rem',
      lineHeight: '1rem',
    },
    subtitle2: {
      color: '#353D40',
      fontSize: '0.8rem',
      fontWeight: 500,
      textTransform: 'uppercase',
    },
  },
  palette: {
    background: {
      default: '#E0E6EF',
    },
    primary: {
      main: '#553285',
      light: '#7B52AB',
      dark: '#36175E',
      contrastText: '#E1D7EC',
    },
    secondary: {
      main: '#6b77a1',
      light: '#c7cde1',
      dark: '#565e7a',
      contrastText: '#bac1d9',
    },
    neutral: {
      main: '#353D40',
    },
  },
  animation: {
    greet: keyframes`
      0%,100% { transform: rotate(0) }
      20%,60% { transform: rotate(-25deg) }
      40%,80% { transform: rotate(10deg) }
    `,
  },
});
