
const initial = { user: null, token: null, status: "idle", error: null };

const LOGIN_START = "user/LOGIN_START";
const LOGIN_SUCCESS = "user/LOGIN_SUCCESS";
const LOGIN_FAIL = "user/LOGIN_FAIL";
const LOGOUT = "user/LOGOUT";

export default function user(state = initial, action) {
  switch (action.type) {
    case LOGIN_START:
      return { ...state, status: "loading", error: null };
    case LOGIN_SUCCESS:
      return {
        ...state,
        status: "succeeded",
        user: action.payload.user || null,
        token: action.payload.token || null,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        status: "failed",
        error: action.payload || "Login failed",
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return { ...initial };
    default:
      return state;
  }
}

export const loginStart = () => ({ type: LOGIN_START });
export const loginSuccess = (payload) => ({ type: LOGIN_SUCCESS, payload });
export const loginFail = (msg) => ({ type: LOGIN_FAIL, payload: msg });
export const logout = () => ({ type: LOGOUT });