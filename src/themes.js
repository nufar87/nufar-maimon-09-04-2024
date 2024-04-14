import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
      light: '#f5f5f5',
      dark: '#e0e0e0',
    },
    secondary: {
      main: '#f48fb1',
      secondary: '#424242',
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#616161',
      dark: '#424242',
    },
    secondary: {
      main: '#f50057',
      secondary: '#eceff1',
      accent: '',
    },
  },
});

// const themes = {
//   dark: darkTheme,
//   light: lightTheme,
// };

// export default themes;
