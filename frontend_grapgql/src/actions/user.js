import actionTypes from '../actionTypes';

const getLoginAction = (user) => (
  { type: actionTypes.LOGIN_SUCCESS, user }
);

const getLogoutAction = () => (
  { type: actionTypes.LOGOUT }
);

const getUserUpdateAction = (user) => (
  { type: actionTypes.USER_UPDATE, user }
);

export default {
  getLoginAction,
  getLogoutAction,
  getUserUpdateAction,
};
