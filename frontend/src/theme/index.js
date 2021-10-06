import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    htmlFontSize: 10,
  },
  palette: {
    primary: {
      main: '#1976f2',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1.6rem',
          minWidth: 'auto',
          padding: 0,
        },
        contained: {
          padding: 10,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: 16,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: '4.6rem',
          fontWeight: 'bold',
          marginBottom: '2rem',
          '@media (max-width: 767px)': {
            fontSize: '4.4rem',
          },
        },
        h2: {
          color: '#b5bfcb',
          fontSize: '4rem',
          fontWeight: 'bold',
          marginBottom: '2rem',
          '@media (max-width: 767px)': {
            fontSize: '3.5rem',
          },
        },
      },
    },
  },
});

export default theme;
