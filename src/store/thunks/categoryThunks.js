
import axiosInstance from "../../api/axiosInstance";
import {
  categoriesStart,
  categoriesSuccess,
  categoriesFail,
} from "../reducers/categoryReducer";


export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch(categoriesStart());
    const res = await axiosInstance.get("/categories");
    
    dispatch(categoriesSuccess(res.data || []));
  } catch (err) {
    const msg = err?.response?.data?.message || "Failed to fetch categories";
    dispatch(categoriesFail(msg));
  }
};


export const fetchCategoriesIfNeeded = () => (dispatch, getState) => {
  const st = getState();
  const done = st.category?.fetchState === "FULFILLED";
  const loading = st.category?.fetchState === "FETCHING";
  if (!done && !loading) {
    dispatch(fetchCategories());
  }
};