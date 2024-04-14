import { ReactComponent as SunAnimation } from '../assets/animation/day.svg';
import { ReactComponent as PartlySunAnimation } from '../assets/animation/cloudy-day-1.svg';
import { ReactComponent as CloudyAnimation } from '../assets/animation/cloudy-day-3.svg';
import { ReactComponent as MostlyCloudAnimation } from '../assets/animation/cloudy.svg';
import { ReactComponent as ShowersAnimation } from '../assets/animation/rainy-6.svg';
import { ReactComponent as RainSunAnimation } from '../assets/animation/rainy-1.svg';
import { ReactComponent as RainySunAnimation } from '../assets/animation/rainy-3.svg';
import { ReactComponent as RainAnimation } from '../assets/animation/rainy-7.svg';
import { ReactComponent as CloudSnowAnimation } from '../assets/animation/snowy-1.svg';
import { ReactComponent as ColdAnimation } from '../assets/animation/snowy-4.svg';
import { ReactComponent as NightAnimation } from '../assets/animation/night.svg';
import { ReactComponent as MostlyClearAnimation } from '../assets/animation/cloudy-night-1.svg';
import { ReactComponent as ThunderAnimation } from '../assets/animation/thunder.svg';
import { ReactComponent as CloudySnowAnimation } from '../assets/animation/snowy-5.svg';
import { ReactComponent as RainyCloudAnimation } from '../assets/animation/rainy-5.svg';

export const mapAmination = (animationPhrase) => {
  const lowerCaseAnimationPhrase = animationPhrase.toLowerCase();

  switch (lowerCaseAnimationPhrase) {
    case 'sunny':
    case 'mostly sunny':
    case 'hot':
      return <SunAnimation />;
    case 'partly sunny':
    case 'intermittent clouds':
    case 'mostly cloudy w/ flurries':
    case 'partly sunny w/ flurries':
      return <PartlySunAnimation />;
    case 'hazy sunshine':
    case 'mostly cloudy':
      return <CloudyAnimation />;
    case 'cloudy':
    case 'dreamy (overcast)':
    case 'fog':
      return <MostlyCloudAnimation />;
    case 'showers':
      return <ShowersAnimation />;
    case 'mostly cloudy w/ showers':
    case 'partly sunny w/ showers':
      return <RainSunAnimation />;
    case 'mostly cloudy w/ t-stroms':
    case 'partly sunny w/ t-stroms':
      return <RainySunAnimation />;
    case 'snow':
    case 'ice':
    case 'cold':
      return <ColdAnimation />;
    case 'mostly cloudy w/ snow':
      return <CloudSnowAnimation />;
    case 'rain':
    case 'sleet':
    case 'freezing rain':
    case 'rain and snow':
    case 't-stroms':
      return <RainAnimation />;
    case 'clear':
    case 'hazy moonlight':
      return <NightAnimation />;
    case 'mostly clear':
    case 'partly cloudy':
    case 'intermittent clouds':
      return <MostlyClearAnimation className='weather-animation' />;
    case 'mostly cloudy':
    case 'mostly cloudy w/ flurries':
    case 'windy':
    case 'flurries':
      return <MostlyCloudAnimation />;
    case 'partly cloudy w/ showers':
    case 'mostly cloudy w/ showers':
      return <RainyCloudAnimation />;
    case 'partly cloudy w/ t-stroms':
    case 'mostly cloudy w/ t-stroms':
      return <ThunderAnimation className='weather-animation' />;
    case 'mostly cloudy w/ snow':
      return <CloudySnowAnimation />;
    default:
      return null;
  }
};
