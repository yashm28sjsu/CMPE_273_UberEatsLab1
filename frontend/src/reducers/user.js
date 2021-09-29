import produce from 'immer';
import actionTypes from '../actionTypes';

const loginReducer = (state = {}, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return produce(state, (_draftState) => (
        // eslint-disable-next-line no-param-reassign
        action.user
      ));
    default:
      return state;
  }
};

export default loginReducer;
