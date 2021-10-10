import actionTypes from '../actionTypes';

const getRestaurantSelectedAction = (restaurant) => (
  { type: actionTypes.RESTAURANT_SELECTED, restaurant }
);

export default {
  getRestaurantSelectedAction,
};
