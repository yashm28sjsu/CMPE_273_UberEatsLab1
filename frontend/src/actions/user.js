import actionTypes from '../actionTypes';

const getLoginAction = (user) => (
  { type: actionTypes.LOGIN_SUCCESS, user }
);

const getLogoutAction = (user) => (
  { type: actionTypes.LOGOUT }
);

export default {
  getLoginAction,
  getLogoutAction,
};
