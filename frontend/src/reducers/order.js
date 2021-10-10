/* eslint-disable no-param-reassign */
import produce from 'immer';
import actionTypes from '../actionTypes';

const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ORDER_ADDRESS_SELECTED:
      return produce(state, (draftState) => {
        draftState.AddressId = action.AddressId;
      });
    case actionTypes.ORDER_DELIVERY_MODE_SELECTED:
      return produce(state, (draftState) => {
        draftState.type = action.deliveryMode;
      });
    case actionTypes.ORDER_PLACED:
      return {};
    default:
      return state;
  }
};

export default orderReducer;
