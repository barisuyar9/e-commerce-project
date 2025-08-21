
const initial = {
  items: [], 
  fetchState: "NOT_FETCHED", 
  error: null,
};


const CATEGORIES_START = "category/CATEGORIES_START";
const CATEGORIES_SUCCESS = "category/CATEGORIES_SUCCESS";
const CATEGORIES_FAIL = "category/CATEGORIES_FAIL";


export default function category(state = initial, action) {
  switch (action.type) {
    case CATEGORIES_START:
      return { ...state, fetchState: "FETCHING", error: null };
    case CATEGORIES_SUCCESS:
      return { ...state, fetchState: "FULFILLED", items: action.payload };
    case CATEGORIES_FAIL:
      return { ...state, fetchState: "FAILED", error: action.payload };
    default:
      return state;
  }
}


export const categoriesStart = () => ({ type: CATEGORIES_START });
export const categoriesSuccess = (payload) => ({
  type: CATEGORIES_SUCCESS,
  payload,
});
export const categoriesFail = (msg) => ({
  type: CATEGORIES_FAIL,
  payload: msg,
});