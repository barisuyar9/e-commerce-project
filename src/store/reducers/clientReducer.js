import {
  CLIENT_SET_USER,
  CLIENT_SET_ROLES,
  CLIENT_SET_THEME,
  CLIENT_SET_LANGUAGE,
} from "../actionTypes";

const initialState = {
  user: null, 
  addressList: [], 
  creditCards: [],
  roles: [], 
  theme: "light",
  language: "en", 
};

export default function clientReducer(state = initialState, action) {
  switch (action.type) {
    case CLIENT_SET_USER:
      return { ...state, user: action.payload };
    case CLIENT_SET_ROLES:
      return { ...state, roles: action.payload };
    case CLIENT_SET_THEME:
      return { ...state, theme: action.payload };
    case CLIENT_SET_LANGUAGE:
      return { ...state, language: action.payload };
    default:
      return state;
  }
}