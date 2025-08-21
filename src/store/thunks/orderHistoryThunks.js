import axiosInstance from "../../api/axiosInstance";
import {
  setOrderHistList,
  setOrderHistFetchState,
  setOrderHistError,
} from "../actions/orderHistoryActions";

export const fetchOrders = () => async (dispatch) => {
  try {
    dispatch(setOrderHistFetchState("FETCHING"));
    dispatch(setOrderHistError(null));
    const res = await axiosInstance.get("/order"); 
    const list = Array.isArray(res.data) ? res.data : res.data?.orders || [];
    dispatch(setOrderHistList(list));
    dispatch(setOrderHistFetchState("FETCHED"));
  } catch (err) {
    dispatch(
      setOrderHistError(
        err?.response?.data?.message || "Failed to fetch orders"
      )
    );
    dispatch(setOrderHistFetchState("FAILED"));
  }
};