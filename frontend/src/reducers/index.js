import { combineReducers } from 'redux';
import loginReducer from './user';

export default combineReducers({
  user: loginReducer,
});
