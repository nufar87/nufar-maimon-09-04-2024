const weatherAPI = process.env.REACT_APP_WEATHER_API_KEY;

export const getCurrentPosition = async () => {
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error)
      );
    });
    const { latitude, longitude } = position.coords;
    return { latitude, longitude };
  } catch (error) {
    throw new Error('Error getting current position: ' + error.message);
  }
};

export const getLocationKeyByLatLon = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${encodeURIComponent(
        weatherAPI
      )}&q=${latitude},${longitude}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch location key');
    }
    const data = await response.json();
    const locationInfo = {
      city: data.LocalizedName,
      locationKey: data.Key,
    };

    return locationInfo;
  } catch (error) {
    throw new Error('Error fetching location key: ' + error.message);
  }
};
