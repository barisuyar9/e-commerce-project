import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import {thunk} from "redux-thunk";
import { createLogger } from "redux-logger";
import user from "./reducers/userReducer";

import client from "./reducers/clientReducer";
import product from "./reducers/productReducer";
import cart from "./reducers/cartReducer";
import category from "./reducers/categoryReducer";
import favorites from "./reducers/favoritesReducers";
import address from "./reducers/addressReducer";
import card from "./reducers/cardReducer";
import order from "./reducers/orderReducer";
import orderHistory from "./reducers/orderHistoryReducer";

const rootReducer = combineReducers({
  client,
  product,
  cart,
  user,
  category,
  favorites,
  address,
  card,
  order,
  orderHistory,
});


const middlewares = [thunk];


if (import.meta?.env?.DEV) {
  const logger = createLogger({ collapsed: true });
  middlewares.push(logger);
}


const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;