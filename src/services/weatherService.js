const weatherAPI = process.env.REACT_APP_WEATHER_API_KEY;

export const fetchCitySuggestions = async (term) => {
  try {
    const response = await fetch(
      `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${encodeURIComponent(
        weatherAPI
      )}&q=${encodeURIComponent(term)}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch suggestions');
    }

    const data = await response.json();
    const formattedSuggestions = data.map((city) => ({
      key: city.Key,
      city: city.LocalizedName,
      country: city.Country.LocalizedName,
    }));
    return formattedSuggestions;
  } catch (error) {
    console.error('Error fetching suggestions:', error);
  }
};

export const fetchCurrentWeather = async (cityKey) => {
  try {
    const response = await fetch(
      `https://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${encodeURIComponent(
        weatherAPI
      )}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch current weather');
    }

    const data = await response.json();
    const weatherDetails = {
      currentWeather: data[0].WeatherText,
      time: data[0].LocalObservationDateTime,
      temperature: {
        imperial: data[0].Temperature.Imperial.Value,
        metric: data[0].Temperature.Metric.Value,
      },
    };
    return weatherDetails;
  } catch (error) {
    console.error('Error fetching current weather:', error);
  }
};

export const fetch5DayForecast = async (cityKey) => {
  try {
    const response = await fetch(
      `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${encodeURIComponent(
        weatherAPI
      )}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch 5-day forecast');
    }

    const data = await response.json();
    return data.DailyForecasts;
  } catch (error) {
    console.error('Error fetching 5-day forecast:', error);
  }
};
