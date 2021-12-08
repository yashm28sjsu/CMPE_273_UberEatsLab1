/* eslint-disable no-param-reassign */
import produce from 'immer';
import actionTypes from '../actionTypes';

const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ORDER_ADDRESS_SELECTED:
      return produce(state, (draftState) => {
        draftState.addressId = action.AddressId;
      });
    case actionTypes.ORDER_DELIVERY_MODE_SELECTED:
      return produce(state, (draftState) => {
        draftState.type = action.deliveryMode;
      });
    case actionTypes.ORDER_PLACED:
      return {};
    case actionTypes.ORDER_SPECIAL_INSTURCTIONS_CHANGED:
      return produce(state, (draftState) => {
        draftState.instructions = action.instructions;
      });
    default:
      return state;
  }
};

export default orderReducer;
