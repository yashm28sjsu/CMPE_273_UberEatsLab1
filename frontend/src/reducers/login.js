import { Produce } from 'immer';
import actionTypes from '../actionTypes';

const loginReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return Produce(state, (draftState) => {
        // eslint-disable-next-line no-param-reassign
        draftState.user = action.user;
      });
    default:
      return state;
  }
};

export default loginReducer;
