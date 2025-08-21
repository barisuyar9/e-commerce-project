import {
  ADDRESS_SET_LIST,
  ADDRESS_SET_FETCH_STATE,
  ADDRESS_SELECT_SHIPPING,
  ADDRESS_SELECT_BILLING,
} from "../actionTypes";

export const setAddressList = (arr) => ({
  type: ADDRESS_SET_LIST,
  payload: arr,
});
export const setAddressFetchState = (s) => ({
  type: ADDRESS_SET_FETCH_STATE,
  payload: s,
});

export const selectShipping = (id) => ({
  type: ADDRESS_SELECT_SHIPPING,
  payload: id,
});
export const selectBilling = (id) => ({
  type: ADDRESS_SELECT_BILLING,
  payload: id,
});