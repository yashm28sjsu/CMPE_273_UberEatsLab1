import { combineReducers } from 'redux';
import loginReducer from './user';
import restaurantReducer from './restaurant';

export default combineReducers({
  user: loginReducer,
  restaurant: restaurantReducer,
});
