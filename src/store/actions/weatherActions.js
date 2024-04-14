import {
  fetchCitySuggestions as fetchCitySuggestionsService,
  fetchCurrentWeather as fetchCurrentWeatherService,
  fetch5DayForecast as fetch5DayForecastService,
} from '../../services/weatherService';

import {
  getLocationKeyByLatLon as getLocationKeyByLatLonService,
  getCurrentPosition as getCurrentPositionService,
} from '../../services/locationService';

export const getCurrentPosition = () => {
  return async (dispatch) => {
    try {
      const position = await getCurrentPositionService();
      const { latitude, longitude } = position;
      await dispatch(setDefaultLocation(latitude, longitude));

      return { latitude, longitude };
    } catch (error) {
      console.error(
        'Error fetching current position and setting default location:',
        error
      );
      await dispatch(setDefaultLocationForBlockedUser());
    }
  };
};

export const setDefaultLocationForBlockedUser = () => {
  return async (dispatch) => {
    const defaultCity = {
      cityName: 'Tel Aviv',
      locationKey: '215854',
    };
    await dispatch({
      type: 'SET_DEFAULT_LOCATION',
      city: defaultCity.cityName,
      locationKey: defaultCity.locationKey,
    });
    const locationKey = defaultCity.locationKey;
    await dispatch(fetchCurrentWeather(locationKey));
  };
};

export const setDefaultLocation = (latitude, longitude) => {
  return async (dispatch) => {
    try {
      const locationInfo = await getLocationKeyByLatLonService(
        latitude,
        longitude
      );
      const { city, locationKey } = locationInfo;

      dispatch({ type: 'SET_DEFAULT_LOCATION', city, locationKey });
      dispatch(fetchCurrentWeather(locationKey));
    } catch (error) {
      console.error('Error setting default location:', error);
    }
  };
};

export const fetchCitySuggestions = (term) => {
  return async (dispatch) => {
    try {
      const data = await fetchCitySuggestionsService(term);
      dispatch({ type: 'FETCH_CITY_SUGGESTIONS', suggestions: data });
      return data;
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
      throw error;
    }
  };
};

export const selectCity = (city) => {
  return async (dispatch) => {
    try {
      const storedCityData = localStorage.getItem(city.key);
      if (storedCityData) {
        const parsedCityData = JSON.parse(storedCityData);
        const { weatherDetails, timestamp } = parsedCityData;
        const currentTimestamp = Date.now();
        const hoursDifference =
          (currentTimestamp - timestamp) / (1000 * 60 * 60);

        // Check if data is from the same day and within 2 hours
        if (isSameDay(new Date(timestamp), new Date()) && hoursDifference < 2) {
          // Data is recent, use it
          dispatch({ type: 'FETCH_CURRENT_WEATHER', weatherDetails });
          // No need to fetch forecast, so return
          return;
        }
      }
      dispatch({ type: 'SELECT_CITY', city });
      const weatherDetails = await fetchCurrentWeatherService(city.key);
      const dailyForecast = await fetch5DayForecastService(city.key);

      dispatch({ type: 'FETCH_CURRENT_WEATHER', weatherDetails });
      dispatch({ type: 'FETCH_5_DAY_FORECAST', payload: dailyForecast });

      const newData = {
        cityKey: city.key,
        cityName: city.city,
        countryName: city.country,
        weatherDetails,
        dailyForecast,
        timestamp: Date.now(),
      };
      localStorage.setItem(city.key, JSON.stringify(newData));
    } catch (error) {
      console.error('Error selecting city:', error);
    }
  };
};

const isSameDay = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const fetchCurrentWeather = (cityKey) => {
  return async (dispatch) => {
    try {
      const weatherDetails = await fetchCurrentWeatherService(cityKey);
      dispatch({ type: 'FETCH_CURRENT_WEATHER', weatherDetails });
      const dailyForecast = await fetch5DayForecastService(cityKey);
      dispatch({ type: 'FETCH_5_DAY_FORECAST', payload: dailyForecast });
    } catch (error) {
      console.error('Error fetching current weather:', error);
    }
  };
};

export const fetchFavorite = (favorite) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'FETCH_FAVORITE', favorite });
      const weatherDetails = await fetchCurrentWeatherService(
        favorite.selectedCityKey
      );
      const dailyForecast = await fetch5DayForecastService(
        favorite.selectedCityKey
      );

      dispatch({ type: 'FETCH_CURRENT_WEATHER', weatherDetails });
      dispatch({ type: 'FETCH_5_DAY_FORECAST', payload: dailyForecast });
    } catch (error) {
      console.error('Error selecting city:', error);
    }
  };
};

export const toggleTheme = () => ({
  type: 'TOGGLE_THEME',
});

export const setTempUnit = (isMetric) => ({
  type: 'SET_TEMP_UNIT',
  payload: isMetric,
});
