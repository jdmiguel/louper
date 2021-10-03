/* material-ui */
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
      fontSize: '4.4rem',
      fontWeight: 700,
      letterSpacing: '-0.25rem',
      lineHeight: 0,
      '@media (min-width: 768px)': {
        fontSize: '6rem',
      },
    },
    h2: {
      color: '#353D40',
      fontSize: '3rem',
      fontWeight: 300,
      letterSpacing: '-0.1rem',
      lineHeight: 0,
      '@media (min-width: 768px)': {
        fontSize: '4.2rem',
      },
    },
    h3: {
      color: '#353D40',
      fontSize: '2rem',
      fontWeight: 700,
    },
    h4: {
      color: '#353D40',
      fontSize: '1.1rem',
      fontWeight: 500,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
    h6: {
      color: '#353D40',
      fontSize: '1.2rem',
    },
    button: {
      fontSize: '1rem',
    },
    body1: {
      color: '#353D40',
      fontSize: '1rem',
    },
    body2: {
      color: '#353D40',
      fontSize: '0.9rem',
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
      main: '#E0E6EF',
      light: '#F0F3F7',
      dark: '#b5c0d1',
      contrastText: '#353D40',
    },
  },
  animation: {
    greet: {
      '0%,100%': { transform: 'rotate(0)' },
      '20%,60%': { transform: 'rotate(-25deg)' },
      '40%,80%': { transform: 'rotate(10deg)' },
    },
    topIn: {
      from: {
        transform: 'translateY(-150px)',
      },
      to: {
        transform: 'translateY(0)',
      },
    },
    bottomIn: {
      from: {
        transform: 'translateY(100%)',
      },
      to: {
        transform: 'translateY(0)',
      },
    },
  },
});
