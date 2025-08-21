import { FAV_ADD, FAV_REMOVE, FAV_TOGGLE, FAV_CLEAR } from "../actionTypes";

export const addFavorite = (product) => ({ type: FAV_ADD, payload: product });
export const removeFavorite = (productId) => ({
  type: FAV_REMOVE,
  payload: productId,
});
export const toggleFavorite = (product) => ({
  type: FAV_TOGGLE,
  payload: product,
});
export const clearFavorites = () => ({ type: FAV_CLEAR });