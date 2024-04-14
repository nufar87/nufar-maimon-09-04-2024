import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { mapIcon } from './mapIcon';
import useTheme from '@mui/material/styles/useTheme';

const FavoriteCard = ({ fav }) => {
  const theme = useTheme();
  const isMetricTemp = useSelector((state) => state.weather.isMetricTemp);

  const tempUnit = isMetricTemp ? '°C' : '°F';

  return (
    <Card
      style={{
        flex: '1',
        margin: '8px',
        // height: '100%',
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'space-between',
      }}
    >
      <CardContent
        style={
          {
            // height: '100%', alignItems: 'stretch'
          }
        }
      >
        <Typography variant='body2' align='center'>
          {fav.selectedCity}
        </Typography>
        <Typography variant='subtitle1' align='center'>
          {fav.weatherDetails?.currentWeather}
        </Typography>
        <div style={{ textAlign: 'center', marginRight: '10px' }}>
          {mapIcon(fav.weatherDetails?.currentWeather)}
        </div>
        <Typography variant='subtitle2' align='center'>
          {isMetricTemp
            ? fav.weatherDetails?.temperature.metric
            : fav.weatherDetails?.temperature.imperial}{' '}
          {tempUnit}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FavoriteCard;
