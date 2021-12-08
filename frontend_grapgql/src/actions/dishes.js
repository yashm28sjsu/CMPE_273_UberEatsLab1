import actionTypes from '../actionTypes';

const getDishAddedAction = (restaurant, dish, qty) => (
  { type: actionTypes.DISH_ADDED, restaurant, dish: { ...dish, qty } }
);

const getDishRemovedAction = (dish) => (
  { type: actionTypes.DISH_REMOVED, dish }
);

export default {
  getDishAddedAction,
  getDishRemovedAction,
};
