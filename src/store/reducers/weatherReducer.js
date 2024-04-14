const initialState = {
  defaultLocation: {
    cityName: null,
    locationKey: null,
  },
  suggestions: [],
  selectedCity: {
    cityName: null,
    locationKey: null,
  },
  error: null,
  weatherDetails: {},
  dailyForecast: null,
  darkMode: false,
  isMetricTemp: true,
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CITY_SUGGESTIONS':
      return { ...state, suggestions: action.suggestions, error: null };
    case 'SELECT_CITY':
      return {
        ...state,
        selectedCity: {
          ...state.selectedCity,
          cityName: action.city.city,
          locationKey: action.city.key,
        },
      };
    case 'FETCH_CURRENT_WEATHER':
      return { ...state, weatherDetails: action.weatherDetails, error: null };
    case 'FETCH_5_DAY_FORECAST':
      return { ...state, dailyForecast: action.payload, error: null };
    case 'TOGGLE_THEME':
      return { ...state, darkMode: !state.darkMode };
    case 'SET_TEMP_UNIT':
      return { ...state, isMetricTemp: action.payload };
    case 'FETCH_FAVORITE':
      return {
        ...state,
        selectedCity: {
          ...state.selectedCity,
          cityName: action.favorite.selectedCity,
          locationKey: action.favorite.selectedCityKey,
        },
      };
    case 'SET_DEFAULT_LOCATION':
      return {
        ...state,
        defaultLocation: {
          ...state.defaultLocation,
          cityName: action.city,
          locationKey: action.locationKey,
        },
        selectedCity: {
          ...state.selectedCity,
          cityName: action.city,
          locationKey: action.locationKey,
        },
      };
    default:
      return state;
  }
};

export default weatherReducer;
