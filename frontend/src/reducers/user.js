import actionTypes from '../actionTypes';

const userReducer = (state = {}, action) => {
  // console.log(action);
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return action.user;
    case actionTypes.LOGOUT:
      return {};
    default:
      return state;
  }
};

export default userReducer;
