import {
  ORDER_SET_ADDRESSES,
  ORDER_SET_ITEMS,
  ORDER_SET_SUMMARY,
  ORDER_CLEAR,
} from "../actionTypes";


export const setOrderAddresses = ({ shippingId, billingId }) => ({
  type: ORDER_SET_ADDRESSES,
  payload: { shippingId, billingId },
});


export const setOrderItems = (items) => ({
  type: ORDER_SET_ITEMS,
  payload: items,
});


export const setOrderSummary = (summary) => ({
  type: ORDER_SET_SUMMARY,
  payload: summary,
});

export const clearOrder = () => ({ type: ORDER_CLEAR });