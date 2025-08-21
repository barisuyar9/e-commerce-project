import {
  CARD_SET_LIST,
  CARD_SET_FETCH_STATE,
  CARD_SELECT,
} from "../actionTypes";

const initialState = {
  items: [],
  fetchState: "NOT_FETCHED", 
  selectedId: null,
};

export default function card(state = initialState, action) {
  switch (action.type) {
    case CARD_SET_LIST: {
      const list = Array.isArray(action.payload) ? action.payload : [];
      const first = list[0]?.id ?? null;
      return {
        ...state,
        items: list,
        selectedId: state.selectedId ?? first,
      };
    }
    case CARD_SET_FETCH_STATE:
      return { ...state, fetchState: action.payload };
    case CARD_SELECT:
      return { ...state, selectedId: action.payload };
    default:
      return state;
  }
}