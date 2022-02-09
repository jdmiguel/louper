/* material-ui */
import { keyframes } from '@emotion/react';
import { createTheme } from '@mui/material/styles';

/* colors */
import { colors } from './colors';

type Animation = {
  greet: any;
  shimmer: any;
};

declare module '@mui/material/styles' {
  interface Theme {
    animation: Animation;
    overrides: any;
  }

  interface ThemeOptions {
    animation: Animation;
    overrides: any;
  }
}

export const theme = createTheme({
  animation: {
    greet: keyframes`
      0%,100% { transform: rotate(0) }
      20%,60% { transform: rotate(-25deg) }
      40%,80% { transform: rotate(10deg) }
    `,
    shimmer: keyframes`
      0% { background-position-x: -1200px}
      100% { background-position-x: 1200px}
    `,
  },
  overrides: [
    {
      MuiCssBaseline: {
        '@global': {
          html: {
            overflowX: 'hidden',
            background: colors.darkBlue,
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
  ],
  typography: {
    fontFamily: ['Comfortaa', 'Arial', 'sans-serif'].join(','),
    htmlFontSize: 12,
    h2: {
      fontSize: '1.1rem',
      fontWeight: 300,
      lineHeight: 0,
      '@media (min-width: 768px)': {
        fontSize: '1.3rem',
      },
    },
    h3: {
      fontSize: '1.3rem',
      fontWeight: 700,
      '@media (min-width: 768px)': {
        fontSize: '1.5rem',
      },
    },
    h4: {
      fontSize: '1.1rem',
      fontWeight: 500,
      '@media (min-width: 768px)': {
        fontSize: '1.2rem',
      },
    },
    h5: {
      fontSize: '0.9rem',
      fontWeight: 700,
      textTransform: 'uppercase',
    },
    h6: {
      fontSize: '0.8rem',
      fontWeight: 700,
      textTransform: 'uppercase',
    },
    button: {
      fontSize: '0.9rem',
    },
    body1: {
      fontSize: '0.9rem',
      fontWeight: 300,
      lineHeight: '1.2rem',
    },
    body2: {
      fontSize: '0.9rem',
      fontWeight: 700,
      lineHeight: '1.2rem',
    },
    overline: {
      fontSize: '0.7rem',
      lineHeight: '1rem',
      textTransform: 'uppercase',
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: colors.pink,
      light: colors.lightPink,
      dark: colors.darkPink,
    },
    secondary: {
      main: colors.blue,
      light: colors.lightBlue,
      dark: colors.darkBlue,
    },
    background: {
      default: colors.darkBlue,
    },
    text: {
      primary: colors.white,
      secondary: colors.lightBlue,
      disabled: colors.lightGrey,
    },
  },
});