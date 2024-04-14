import { combineReducers } from 'redux';
import weatherReducer from './weatherReducer';
import favoritesReducer from './favoritesReducer';

const rootReducer = combineReducers({
  weather: weatherReducer,
  favorites: favoritesReducer,
});

export default rootReducer;
