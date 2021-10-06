import actionTypes from '../actionTypes';

const userReducer = (state = {}, action) => {
  // console.log(action);
  switch (action.type) {
    case actionTypes.RESTAURANT_SELECTED:
      return action.restaurant;
    default:
      return state;
  }
};

export default userReducer;
