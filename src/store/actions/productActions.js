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

export const setCategories = (arr) => ({
  type: PRODUCT_SET_CATEGORIES,
  payload: arr,
});
export const setProductList = (arr) => ({
  type: PRODUCT_SET_LIST,
  payload: arr,
});
export const setTotal = (n) => ({ type: PRODUCT_SET_TOTAL, payload: n });
export const setFetchState = (s) => ({
  type: PRODUCT_SET_FETCH_STATE,
  payload: s,
});


export const setProductDetail = (obj) => ({
  type: PRODUCT_SET_DETAIL,
  payload: obj,
});

export const setProductDetailFetchState = (s) => ({
  type: PRODUCT_SET_DETAIL_FETCH_STATE,
  payload: s, 
});

export const setLimit = (n) => ({ type: PRODUCT_SET_LIMIT, payload: n });
export const setOffset = (n) => ({ type: PRODUCT_SET_OFFSET, payload: n });
export const setFilter = (s) => ({ type: PRODUCT_SET_FILTER, payload: s });
