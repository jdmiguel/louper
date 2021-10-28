/* material-ui */
import { keyframes } from '@emotion/react';
import { createTheme } from '@mui/material/styles';

/* colors */
import { color } from './colors';

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

export const lightTheme = createTheme({
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
            background: color.light,
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
    h1: {
      fontSize: '4.8rem',
      fontWeight: 700,
      letterSpacing: '-0.25rem',
      lineHeight: 0,
      '@media (min-width: 769px)': {
        fontSize: '6rem',
      },
    },
    h2: {
      fontSize: '3.5rem',
      fontWeight: 300,
      letterSpacing: '-0.1rem',
      lineHeight: 0,
      '@media (min-width: 769px)': {
        fontSize: '4.2rem',
      },
    },
    h3: {
      fontSize: '1.3rem',
      fontWeight: 700,
      '@media (min-width: 769px)': {
        fontSize: '1.5rem',
      },
    },
    h4: {
      fontSize: '1.1rem',
      fontWeight: 500,
      '@media (min-width: 769px)': {
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
      lineHeight: '1.1rem',
    },
    body2: {
      fontSize: '0.9rem',
      fontWeight: 700,
      lineHeight: '1.1rem',
    },
    overline: {
      fontSize: '0.7rem',
      lineHeight: '1rem',
      textTransform: 'uppercase',
    },
  },
  palette: {
    background: {
      default: color.light,
    },
    text: {
      primary: color.dark,
      secondary: color.blue,
      disabled: color.lightGrey,
    },
    primary: {
      main: color.purple,
      light: color.lightPurple,
      dark: color.darkPurple,
      contrastText: color.light,
    },
    secondary: {
      main: color.blue,
      light: color.lightBlue,
      dark: color.darkBlue,
      contrastText: color.dark,
    },
  },
});

export const darkTheme = createTheme({
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
  ],
  typography: {
    fontFamily: ['Comfortaa', 'Arial', 'sans-serif'].join(','),
    htmlFontSize: 12,
    h1: {
      fontSize: '4.8rem',
      fontWeight: 700,
      letterSpacing: '-0.25rem',
      lineHeight: 0,
      '@media (min-width: 769px)': {
        fontSize: '6rem',
      },
    },
    h2: {
      fontSize: '3.5rem',
      fontWeight: 300,
      letterSpacing: '-0.1rem',
      lineHeight: 0,
      '@media (min-width: 769px)': {
        fontSize: '4.2rem',
      },
    },
    h3: {
      fontSize: '1.3rem',
      fontWeight: 700,
      '@media (min-width: 769px)': {
        fontSize: '1.5rem',
      },
    },
    h4: {
      fontSize: '1.1rem',
      fontWeight: 500,
      '@media (min-width: 769px)': {
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
      lineHeight: '1.1rem',
    },
    body2: {
      fontSize: '0.9rem',
      fontWeight: 700,
      lineHeight: '1.1rem',
    },
    overline: {
      fontSize: '0.7rem',
      lineHeight: '1rem',
      textTransform: 'uppercase',
    },
  },
  palette: {
    background: {
      default: color.dark,
    },
    text: {
      primary: color.light,
      secondary: color.cyan,
      disabled: color.lightGrey,
    },
    primary: {
      main: color.mauve,
      light: color.lightMauve,
      dark: color.darkMauve,
      contrastText: color.light,
    },
    secondary: {
      main: color.cyan,
      light: color.lightCyan,
      dark: color.darkCyan,
      contrastText: color.dark,
    },
  },
});
