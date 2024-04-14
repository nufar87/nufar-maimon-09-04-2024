import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeaderExtraFeatures from './components/HeaderExtraFeatures';
import WeatherPage from './pages/WeatherPage';
import FavoritesPage from './pages/FavoritesPage';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector } from 'react-redux'; // Import useSelector hook

import { darkTheme, lightTheme } from './themes'; // Import theme objects

// import './App.css';

function App() {
  const darkMode = useSelector((state) => state.weather.darkMode); // Get dark mode state from Redux
  const theme = darkMode ? darkTheme : lightTheme; // Use theme object based on darkMode state
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />

      <Router>
        <div className='appContainer'>
          <Header />
          <HeaderExtraFeatures />
          <Routes>
            <Route path='/' element={<WeatherPage />} />
            <Route path='/favorites' element={<FavoritesPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
