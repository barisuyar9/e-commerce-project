import {
  PRODUCT_SET_CATEGORIES,
  PRODUCT_SET_LIST,
  PRODUCT_SET_TOTAL,
  PRODUCT_SET_FETCH_STATE,
  PRODUCT_SET_LIMIT,
  PRODUCT_SET_OFFSET,
  PRODUCT_SET_FILTER,
  PRODUCT_SET_DETAIL,
  PRODUCT_SET_DETAIL_FETCH_STATE,
} from "../actionTypes";

const initialState = {
  categories: [],
  productList: [],
  total: 0,
  limit: 25,
  offset: 0,
  filter: "",
  fetchState: "NOT_FETCHED",
  productDetail: null,
  productDetailFetchState: "NOT_FETCHED",
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case PRODUCT_SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case PRODUCT_SET_LIST:
      return { ...state, productList: action.payload };
    case PRODUCT_SET_TOTAL:
      return { ...state, total: action.payload };
    case PRODUCT_SET_FETCH_STATE:
      return { ...state, fetchState: action.payload };
    case PRODUCT_SET_LIMIT:
      return { ...state, limit: action.payload };
    case PRODUCT_SET_OFFSET:
      return { ...state, offset: action.payload };
    case PRODUCT_SET_FILTER:
      return { ...state, filter: action.payload };
    case PRODUCT_SET_DETAIL:
      return { ...state, productDetail: action.payload };
    case PRODUCT_SET_DETAIL_FETCH_STATE:
      return { ...state, productDetailFetchState: action.payload };
    default:
      return state;
  }
}