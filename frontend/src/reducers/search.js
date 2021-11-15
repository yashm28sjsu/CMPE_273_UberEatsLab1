/* eslint-disable no-param-reassign */
import actionTypes from '../actionTypes';

const dishesReducer = (state = '', action) => {
  switch (action.type) {
    case actionTypes.SEARCH_TEXT_UPDATED:
      return { ...state, text: action.text };
    case actionTypes.DELIVERY_MODE_UPDATED:
      return { ...state, deliveryMode: action.deliveryMode };
    case actionTypes.VEGAN_UPDATED:
      return { ...state, vegan: action.vegan };
    case actionTypes.VEG_UPDATED:
      return { ...state, veg: action.veg };
    default:
      return state;
  }
};

export default dishesReducer;
