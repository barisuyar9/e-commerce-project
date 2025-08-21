import axiosInstance from "../../api/axiosInstance";
import {
  setAddressList,
  setAddressFetchState,
} from "../actions/addressActions";

export const fetchAddresses = () => async (dispatch) => {
  try {
    dispatch(setAddressFetchState("FETCHING"));
    const res = await axiosInstance.get("/user/address"); 
    dispatch(setAddressList(res.data || []));
    dispatch(setAddressFetchState("FULFILLED"));
  } catch (err) {
    dispatch(setAddressList([]));
    dispatch(setAddressFetchState("FAILED"));
    console.log(err)
  }
};