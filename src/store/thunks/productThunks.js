import axiosInstance from "../../api/axiosInstance";
import {
  setProductList,
  setTotal,
  setFetchState,
  setProductDetail,
  setProductDetailFetchState,
} from "../actions/productActions";


export const fetchProducts =
  (options = {}) =>
  async (dispatch, getState) => {
    const { limit, offset, filter } = getState().product;

    const params = {
      limit,
      offset,
      ...(filter ? { filter } : {}),
      ...options,
    };

    try {
      dispatch(setFetchState("FETCHING"));
      const res = await axiosInstance.get("/products", { params });
      const { total, products } = res.data || {};
      dispatch(setProductList(Array.isArray(products) ? products : []));
      dispatch(setTotal(Number(total) || 0));
      dispatch(setFetchState("FULFILLED"));
    } catch (err) {
      dispatch(setFetchState("FAILED"));
      console.log(err)
    }
  };

  export const fetchProductById = (productId) => async (dispatch) => {
    try {
      dispatch(setProductDetailFetchState("FETCHING"));
      const res = await axiosInstance.get(`/products/${productId}`);
      dispatch(setProductDetail(res.data || null));
      dispatch(setProductDetailFetchState("FULFILLED"));
    } catch (err) {
      console.log(err)
      dispatch(setProductDetail(null));
      dispatch(setProductDetailFetchState("FAILED"));
    }
  };