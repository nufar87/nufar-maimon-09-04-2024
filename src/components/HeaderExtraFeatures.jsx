import React from 'react';

import { toggleTheme, setTempUnit } from '../store/actions/weatherActions';
import { useDispatch, useSelector } from 'react-redux';
import DarkModeSwitch from './DarkModeSwitch';

const HeaderExtraFeatures = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.weather.darkMode);
  const isMetricTemp = useSelector((state) => state.weather.isMetricTemp);

  const handleToggleTheme = () => {
    dispatch(toggleTheme(darkMode));
  };

  const handleTemperatureUnitChange = (isMetric) => {
    dispatch(setTempUnit(isMetric));
  };

  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'row nowrap',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      <div>
        <span
          style={{
            cursor: 'pointer',
            fontWeight: isMetricTemp ? 'bold' : 'normal',
            marginRight: '0.5rem',
          }}
          onClick={() => handleTemperatureUnitChange(true)}
        >
          °C
        </span>
        |
        <span
          style={{
            cursor: 'pointer',
            fontWeight: !isMetricTemp ? 'bold' : 'normal',
            marginLeft: '0.5rem',
          }}
          onClick={() => handleTemperatureUnitChange(false)}
        >
          °F
        </span>
      </div>
      <div style={{ marginLeft: '20px' }}>
        <DarkModeSwitch onChange={handleToggleTheme} checked={darkMode} />
      </div>
    </div>
  );
};

export default HeaderExtraFeatures;
