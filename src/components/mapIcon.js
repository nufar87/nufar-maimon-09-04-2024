import { ReactComponent as SunIcon } from '../assets/icons/day.svg';
import { ReactComponent as PartlySunIcon } from '../assets/icons/cloudy-day-1.svg';
import { ReactComponent as CloudyIcon } from '../assets/icons/cloudy-day-3.svg';
import { ReactComponent as MostlyCloudIcon } from '../assets/icons/cloudy.svg';
import { ReactComponent as ShowersIcon } from '../assets/icons/rainy-6.svg';
import { ReactComponent as RainSunIcon } from '../assets/icons/rainy-1.svg';
import { ReactComponent as RainySunIcon } from '../assets/icons/rainy-3.svg';
import { ReactComponent as RainIcon } from '../assets/icons/rainy-7.svg';
import { ReactComponent as CloudSnowIcon } from '../assets/icons/snowy-1.svg';
import { ReactComponent as ColdIcon } from '../assets/icons/snowy-4.svg';
import { ReactComponent as NightIcon } from '../assets/icons/night.svg';
import { ReactComponent as MostlyClearIcon } from '../assets/icons/cloudy-night-1.svg';
import { ReactComponent as ThunderIcon } from '../assets/icons/thunder.svg';
import { ReactComponent as CloudySnowIcon } from '../assets/icons/snowy-5.svg';
import { ReactComponent as RainyCloudIcon } from '../assets/icons/rainy-5.svg';

export const mapIcon = (iconPhrase) => {
  if (!iconPhrase) return null;
  const lowerCaseIconPhrase = iconPhrase.toLowerCase();

  switch (lowerCaseIconPhrase) {
    case 'sunny':
    case 'mostly sunny':
    case 'hot':
      return <SunIcon />;
    case 'partly sunny':
    case 'intermittent clouds':
    case 'mostly cloudy w/ flurries':
    case 'partly sunny w/ flurries':
      return <PartlySunIcon />;
    case 'hazy sunshine':
    case 'mostly cloudy':
      return <CloudyIcon />;
    case 'cloudy':
    case 'dreamy (overcast)':
    case 'fog':
      return <MostlyCloudIcon />;
    case 'showers':
      return <ShowersIcon />;
    case 'mostly cloudy w/ showers':
    case 'partly sunny w/ showers':
      return <RainSunIcon />;
    case 'mostly cloudy w/ t-stroms':
    case 'partly sunny w/ t-stroms':
      return <RainySunIcon />;
    case 'snow':
    case 'ice':
    case 'cold':
      return <ColdIcon />;
    case 'mostly cloudy w/ snow':
      return <CloudSnowIcon />;
    case 'rain':
    case 'sleet':
    case 'freezing rain':
    case 'rain and snow':
    case 't-stroms':
      return <RainIcon />;
    case 'clear':
    case 'hazy moonlight':
      return <NightIcon />;
    case 'mostly clear':
    case 'partly cloudy':
    case 'intermittent clouds':
      return <MostlyClearIcon />;
    case 'mostly cloudy':
    case 'mostly cloudy w/ flurries':
    case 'windy':
    case 'flurries':
      return <MostlyCloudIcon />;
    case 'partly cloudy w/ showers':
    case 'mostly cloudy w/ showers':
      return <RainyCloudIcon />;
    case 'partly cloudy w/ t-stroms':
    case 'mostly cloudy w/ t-stroms':
      return <ThunderIcon />;
    case 'mostly cloudy w/ snow':
      return <CloudySnowIcon />;
    default:
      return null;
  }
};
