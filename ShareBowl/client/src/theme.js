// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Nunito, sans-serif', // Use Nunito for the entire application
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
  },
  palette: {
    primary: {
      main: '#658864',
    },
    secondary: {
      main: '#FF4081',
    },
  },
  spacing: 8,
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
      },
    },
  },
});

export default theme;
