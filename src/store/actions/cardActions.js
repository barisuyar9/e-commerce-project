import {
  CARD_SET_LIST,
  CARD_SET_FETCH_STATE,
  CARD_SELECT,
} from "../actionTypes";

export const setCardList = (arr) => ({ type: CARD_SET_LIST, payload: arr });
export const setCardFetchState = (s) => ({
  type: CARD_SET_FETCH_STATE,
  payload: s,
});
export const selectCard = (id) => ({ type: CARD_SELECT, payload: id });