import {
  ORDERHIST_SET_LIST,
  ORDERHIST_SET_FETCH_STATE,
  ORDERHIST_SET_ERROR,
} from "../actionTypes";

const initial = {
  items: [],
  fetchState: "NOT_FETCHED", 
  error: null,
};

export default function orderHistory(state = initial, action) {
  switch (action.type) {
    case ORDERHIST_SET_LIST:
      return { ...state, items: action.payload };
    case ORDERHIST_SET_FETCH_STATE:
      return { ...state, fetchState: action.payload };
    case ORDERHIST_SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}