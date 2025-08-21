import axiosInstance from "../../api/axiosInstance";
import { setCardFetchState, setCardList } from "../actions/cardActions";

export const fetchCards = () => async (dispatch) => {
  try {
    dispatch(setCardFetchState("FETCHING"));
    const res = await axiosInstance.get("/user/card");
    dispatch(setCardList(res.data || []));
    dispatch(setCardFetchState("FULFILLED"));
  } catch (e) {
    console.log(e)
    dispatch(setCardList([]));
    dispatch(setCardFetchState("FAILED"));
  }
};

export const createCard = (payload) => async (dispatch) => {
 
  await axiosInstance.post("/user/card", payload);
  
  return dispatch(fetchCards());
};