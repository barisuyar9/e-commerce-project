import { combineReducers } from "redux";
import client from "./clientReducer";
import product from "./productReducer";
import cart from "./cartReducer";

const rootReducer = combineReducers({
  client,
  product,
  cart,
});

export default rootReducer;