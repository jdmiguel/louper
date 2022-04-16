import { ReactElement } from 'react';
import { keyframes } from '@emotion/react';
import { Keyframes } from '@emotion/serialize';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { colors } from './colors';

type Animation = {
  greet: Keyframes;
  fadeUp: Keyframes;
};

declare module '@mui/material/styles' {
  interface Theme {
    animation: Animation;
  }
  interface ThemeOptions {
    animation: Animation;
  }
  interface Palette {
    neutral: Palette['primary'];
    overlay: Palette['primary'];
  }
  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
    overlay: PaletteOptions['primary'];
  }
}

export const theme = createTheme({
  animation: {
    greet: keyframes`
      0%,100% { transform: rotate(0) }
      20%,60% { transform: rotate(-25deg) }
      40%,80% { transform: rotate(10deg) }
    `,
    fadeUp: keyframes`
      0% { opacity:0; transform: translateY(20px); }
      100% { opacity:1; transform: translateY(0px);  }
  `,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          overflowX: 'hidden',
        },
      },
    },
  },
  typography: {
    fontFamily: ['Comfortaa', 'Arial', 'sans-serif'].join(','),
    htmlFontSize: 12,
    h2: {
      fontSize: '1.1rem',
      fontWeight: 300,
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
      fontSize: '1rem',
      fontWeight: 700,
      textTransform: 'uppercase',
    },
    h6: {
      fontSize: '0.9rem',
      fontWeight: 700,
      textTransform: 'uppercase',
    },
    body1: {
      fontSize: '1em',
    },
    body2: {
      fontSize: '0.9em',
    },
    overline: {
      fontSize: '0.8rem',
      fontWeight: 700,
      lineHeight: '1rem',
      textTransform: 'uppercase',
    },
  },
  palette: {
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
    error: {
      main: colors.red,
    },
    neutral: {
      dark: colors.grey,
      main: colors.lightGrey,
      light: colors.white,
    },
    overlay: {
      main: colors.darkPinkOverlay,
    },
    background: {
      default: colors.darkBlue,
      paper: colors.gradient,
    },
    text: {
      primary: colors.white,
      secondary: colors.lightBlue,
    },
  },
});

export const renderWithTheme = (component: ReactElement) => (
  <ThemeProvider theme={theme}>{component}</ThemeProvider>
);
