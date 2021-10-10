import { combineReducers } from 'redux';
import loginReducer from './user';
import restaurantReducer from './restaurant';
import dishesReducer from './dishes';
import orderReducer from './order';

export default combineReducers({
  user: loginReducer,
  restaurant: restaurantReducer,
  dishes: dishesReducer,
  order: orderReducer,
});
