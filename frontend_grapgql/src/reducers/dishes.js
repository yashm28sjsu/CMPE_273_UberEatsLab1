/* eslint-disable no-param-reassign */
import produce from 'immer';
import actionTypes from '../actionTypes';

const dishesReducer = (state = { restaurant: '', dishes: [] }, action) => {
  switch (action.type) {
    case actionTypes.DISH_ADDED:
      return produce(state, (draftState) => {
        draftState.restaurant = draftState.restaurant !== ''
          ? draftState.restaurant
          : action.restaurant;
        const otherDishes = draftState.dishes.filter((dish) => dish.name !== action.dish.name);
        draftState.dishes = [...otherDishes, action.dish];
      });
    case actionTypes.DISH_REMOVED:
      return produce(state, (draftState) => {
        draftState.dishes = draftState.dishes.filter((dish) => dish.name !== action.dish.name);
        draftState.restaurant = draftState.dishes.length == null ? null : draftState.restaurant;
      });
    case actionTypes.ORDER_PLACED:
      return { restaurant: '', dishes: [] };
    default:
      return state;
  }
};

export default dishesReducer;
