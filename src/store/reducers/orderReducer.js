import {
  ORDER_SET_ADDRESSES,
  ORDER_SET_ITEMS,
  ORDER_SET_SUMMARY,
  ORDER_CLEAR,
} from "../actionTypes";

const initialState = {
  shippingId: null,
  billingId: null,
  items: [], 
  summary: { subtotal: 0, shipping: 0, discount: 0, total: 0 },
};

export default function order(state = initialState, action) {
  switch (action.type) {
    case ORDER_SET_ADDRESSES:
      return { ...state, ...action.payload };
    case ORDER_SET_ITEMS:
      return {
        ...state,
        items: Array.isArray(action.payload) ? action.payload : [],
      };
    case ORDER_SET_SUMMARY:
      return { ...state, summary: { ...state.summary, ...action.payload } };
    case ORDER_CLEAR:
      return initialState;
    default:
      return state;
  }
}