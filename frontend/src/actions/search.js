import actionTypes from '../actionTypes';

const getSearchTextUpdatedAction = (text) => (
  { type: actionTypes.SEARCH_TEXT_UPDATED, text }
);

const getDeliveryModeUpdatedAction = (deliveryMode) => (
  { type: actionTypes.DELIVERY_MODE_UPDATED, deliveryMode }
);

const getVegUpdatedAction = (veg) => (
  { type: actionTypes.VEG_UPDATED, veg }
);

const getVeganUpdatedAction = (vegan) => (
  { type: actionTypes.VEGAN_UPDATED, vegan }
);

export default {
  getSearchTextUpdatedAction,
  getDeliveryModeUpdatedAction,
  getVeganUpdatedAction,
  getVegUpdatedAction,
};
