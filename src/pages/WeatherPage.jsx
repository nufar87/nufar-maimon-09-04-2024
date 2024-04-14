import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useTheme from '@mui/material/styles/useTheme';
import SearchBar from '../components/SearchBar';
import ForecastCard from '../components/ForecastCard';
import { Grid, Box, Typography } from '@mui/material';
import { mapIcon } from '../components/mapIcon';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import {
  fetchCurrentWeather,
  getCurrentPosition,
} from '../store/actions/weatherActions';

const WeatherPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const defaultLocationKey = useSelector(
    (state) => state.weather.defaultLocation.locationKey
  );
  const defaultLocation = useSelector(
    (state) => state.weather.defaultLocation.cityName
  );
  const selectedCity = useSelector(
    (state) => state.weather.selectedCity.cityName
  );
  const selectedCityKey = useSelector(
    (state) => state.weather.selectedCity.locationKey
  );
  const weatherDetails = useSelector((state) => state.weather.weatherDetails);
  const dailyForecasts = useSelector((state) => state.weather.dailyForecast);
  const isMetricTemp = useSelector((state) => state.weather.isMetricTemp);

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!defaultLocationKey) {
      dispatch(getCurrentPosition());
    }
  }, [defaultLocationKey, defaultLocation, dispatch]);

  useEffect(() => {
    if (selectedCityKey) {
      dispatch(fetchCurrentWeather(selectedCityKey));
    }
  }, [selectedCityKey, dispatch]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (selectedCityKey, selectedCity, weatherDetails) => {
    const index = favorites.findIndex(
      (fav) => fav.selectedCityKey === selectedCityKey
    );
    if (index === -1) {
      setFavorites([
        ...favorites,
        { selectedCityKey, selectedCity, weatherDetails },
      ]);
    } else {
      const updatedFavorites = [...favorites];
      updatedFavorites.splice(index, 1);
      setFavorites(updatedFavorites);
    }
  };

  return (
    <div>
      <SearchBar />
      <Box
        p={2}
        pb={4}
        maxWidth={{ md: '800px', lg: '1000px', xl: '1200px' }}
        margin='auto'
        bgcolor={theme.palette.secondary.secondary}
        style={{ marginTop: '20px', borderRadius: '10px' }}
      >
        <Grid container justifyContent='flex-end' direction='row'>
          <Grid
            container
            style={{
              paddingRight: '20px',
              paddingLeft: '20px',
              alignItems: 'stretch',
            }}
          >
            {selectedCity && weatherDetails && (
              <>
                <Grid
                  item
                  xs={3}
                  sm={3}
                  md={2}
                  lg={1}
                  container
                  direction='column'
                  spacing={2}
                  style={{ paddingRight: '20px' }}
                >
                  <Grid item xs>
                    {mapIcon(weatherDetails?.currentWeather)}
                  </Grid>
                  <Grid item xs>
                    <p>{weatherDetails?.currentWeather}</p>
                  </Grid>
                </Grid>

                <Grid
                  item
                  xs={6}
                  ms={2}
                  md={2}
                  container
                  sx={{ alignItems: 'stretch' }}
                  style={{ paddingRight: '10px' }}
                  direction='row'
                >
                  {selectedCity && weatherDetails && (
                    <>
                      <Grid item xs>
                        <Typography
                          variant='h6'
                          style={{
                            textTransform: 'capitalize',
                            color: theme.palette.primary.dark,
                          }}
                        >
                          {selectedCity}
                        </Typography>
                      </Grid>
                      <Grid item xs>
                        <button
                          onClick={() =>
                            toggleFavorite(
                              selectedCityKey,
                              selectedCity,
                              weatherDetails
                            )
                          }
                          style={{
                            border: 'none',
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                          }}
                        >
                          {favorites.some(
                            (fav) => fav.selectedCityKey === selectedCityKey
                          ) ? (
                            <FavoriteIcon />
                          ) : (
                            <FavoriteBorderIcon />
                          )}
                        </button>
                      </Grid>
                      <Grid item xs>
                        <Typography variant='h2'>
                          {isMetricTemp
                            ? `${weatherDetails?.temperature?.metric}°C`
                            : `${weatherDetails?.temperature?.imperial}°F`}
                        </Typography>
                      </Grid>
                    </>
                  )}
                </Grid>
              </>
            )}
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          alignItems='stretch'
          style={{ justifyContent: 'center' }}
        >
          {dailyForecasts &&
            dailyForecasts.map((forecast, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={2}
                lg={2}
                xl={1}
                key={index}
                style={{ display: 'flex' }}
              >
                <ForecastCard forecast={forecast} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </div>
  );
};

export default WeatherPage;
