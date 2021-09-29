import actionTypes from '../actionTypes';

const getLoginAction = (user) => (
  { type: actionTypes.LOGIN_SUCCESS, user }
);

export default {
  getLoginAction,
};
