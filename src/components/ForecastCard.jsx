import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { mapIcon } from './mapIcon';
import useTheme from '@mui/material/styles/useTheme';

const ForecastCard = ({ forecast }) => {
  const theme = useTheme();
  const isMetricTemp = useSelector((state) => state.weather.isMetricTemp);

  const forecastDate = new Date(forecast.Date);
  const options = { day: '2-digit', month: '2-digit' };

  const minTemp = isMetricTemp
    ? Math.round(((forecast.Temperature.Minimum.Value - 32) * 5) / 9)
    : forecast.Temperature.Minimum.Value;
  const maxTemp = isMetricTemp
    ? Math.round(((forecast.Temperature.Maximum.Value - 32) * 5) / 9)
    : forecast.Temperature.Maximum.Value;
  const tempUnit = isMetricTemp ? '°C' : '°F';

  return (
    <Card
      style={{
        flex: '1',
        margin: '8px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
      }}
    >
      <CardContent style={{ height: '100%', alignItems: 'stretch' }}>
        <Typography variant='subtitle2' align='center'>
          {forecastDate.toLocaleDateString('en-GB', options)}{' '}
        </Typography>
        <Typography variant='h5' align='center'>
          {forecastDate.toLocaleDateString(undefined, { weekday: 'short' })}
        </Typography>
        <Typography variant='subtitle1' align='center'>
          {forecast.Day.IconPhrase}
        </Typography>
        <div style={{ textAlign: 'center', marginRight: '10px' }}>
          {mapIcon(forecast.Day.IconPhrase)}
        </div>
        <Typography variant='body2' align='center'>
          <span style={{ color: theme.palette.primary.dark }}>
            {maxTemp}&ensp;
          </span>
          {tempUnit}{' '}
          <span style={{ color: theme.palette.primary.light }}>
            &ensp;&ensp;{minTemp}
          </span>
          &ensp;{tempUnit}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ForecastCard;
