import actionTypes from '../actionTypes';

const getLoginAction = (user) => (
  { type: actionTypes.LOGIN_SUCCESS, user }
);

const getLogoutAction = () => (
  { type: actionTypes.LOGOUT }
);

export default {
  getLoginAction,
  getLogoutAction,
};
