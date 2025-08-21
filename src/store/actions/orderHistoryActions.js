import {
  ORDERHIST_SET_LIST,
  ORDERHIST_SET_FETCH_STATE,
  ORDERHIST_SET_ERROR,
} from "../actionTypes";

export const setOrderHistList = (arr) => ({
  type: ORDERHIST_SET_LIST,
  payload: arr || [],
});
export const setOrderHistFetchState = (s) => ({
  type: ORDERHIST_SET_FETCH_STATE,
  payload: s,
});
export const setOrderHistError = (e) => ({
  type: ORDERHIST_SET_ERROR,
  payload: e || null,
});