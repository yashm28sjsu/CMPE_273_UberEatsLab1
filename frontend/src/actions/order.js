import actionTypes from '../actionTypes';

const getOrderAddressSelectedAction = (AddressId) => (
  { type: actionTypes.ORDER_ADDRESS_SELECTED, AddressId }
);

const getOrderDeliveryModeSelectedAction = (deliveryMode) => (
  { type: actionTypes.ORDER_DELIVERY_MODE_SELECTED, deliveryMode }
);

const getOrderPlacedAction = () => (
  { type: actionTypes.ORDER_PLACED }
);

const getOrderSpecialInstructionChangedAction = (instructions) => (
  { type: actionTypes.ORDER_SPECIAL_INSTURCTIONS_CHANGED, instructions }
);

export default {
  getOrderAddressSelectedAction,
  getOrderDeliveryModeSelectedAction,
  getOrderPlacedAction,
  getOrderSpecialInstructionChangedAction,
};
