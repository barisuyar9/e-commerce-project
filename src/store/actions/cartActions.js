import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_DECREASE_ITEM,
  CART_TOGGLE_CHECKED,
  CART_CLEAR,
} from "../actionTypes";

export const addToCart = (product) => ({
  type: CART_ADD_ITEM,
  payload: product,
});

export const removeFromCart = (productId) => ({
  type: CART_REMOVE_ITEM,
  payload: productId,
});

export const decreaseFromCart = (productId) => ({
  type: CART_DECREASE_ITEM,
  payload: productId,
});

export const toggleChecked = (productId) => ({
  type: CART_TOGGLE_CHECKED,
  payload: productId,
});

export const clearCart = () => ({ type: CART_CLEAR });