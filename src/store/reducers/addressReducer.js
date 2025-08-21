import {
  ADDRESS_SET_LIST,
  ADDRESS_SET_FETCH_STATE,
  ADDRESS_SELECT_SHIPPING,
  ADDRESS_SELECT_BILLING,
} from "../actionTypes";

const initialState = {
  items: [], 
  fetchState: "NOT_FETCHED",
  shippingId: null,
  billingId: null,
};

export default function address(state = initialState, action) {
  switch (action.type) {
    case ADDRESS_SET_LIST: {
      const list = Array.isArray(action.payload) ? action.payload : [];
      // default seçim: ilk adres
      const firstId = list[0]?.id ?? null;
      return {
        ...state,
        items: list,
        shippingId: state.shippingId ?? firstId,
        billingId: state.billingId ?? firstId,
      };
    }
    case ADDRESS_SET_FETCH_STATE:
      return { ...state, fetchState: action.payload };

    case ADDRESS_SELECT_SHIPPING:
      return { ...state, shippingId: action.payload };

    case ADDRESS_SELECT_BILLING:
      return { ...state, billingId: action.payload };

    default:
      return state;
  }
}