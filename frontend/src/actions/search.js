import actionTypes from '../actionTypes';

const getSearchTextUpdatedAction = (text) => (
  { type: actionTypes.SEARCH_TEXT_UPDATED, text }
);

const getDeliveryModeUpdatedAction = (text) => (
  { type: actionTypes.DELIVERY_MODE_UPDATED, text }
);

const getVegUpdatedAction = (text) => (
  { type: actionTypes.VEG_UPDATED, text }
);

const getVeganUpdatedAction = (text) => (
  { type: actionTypes.VEGAN_UPDATED, text }
);

export default {
  getSearchTextUpdatedAction,
  getDeliveryModeUpdatedAction,
  getVeganUpdatedAction,
  getVegUpdatedAction,
};
