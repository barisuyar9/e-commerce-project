import axiosInstance, { setAuthToken } from "../../api/axiosInstance";
import {
  loginStart,
  loginSuccess,
  loginFail,
  logout,
} from "../reducers/userReducer";

export const loginUser =
  ({ email, password, rememberMe }) =>
  async (dispatch) => {
    try {
      dispatch(loginStart());

      const res = await axiosInstance.post("/login", { email, password });
      const { user, token } = res.data || {};

      if (token) {
        setAuthToken(token);
        if (rememberMe) {
          localStorage.setItem("token", token);
        }
      }

      dispatch(loginSuccess({ user, token }));
      return { user, token };
    } catch (err) {
      const msg = err?.response?.data?.message || "Login failed";
      dispatch(loginFail(msg));
      throw msg;
    }
  };

export const initAuth = () => async (dispatch) => {
  const saved = localStorage.getItem("token");
  if (!saved) {
    setAuthToken(null);
    return;
  }
  setAuthToken(saved);
  await dispatch(verifyToken());
};

export const verifyToken = () => async (dispatch) => {
  try {
    dispatch(loginStart());

    const res = await axiosInstance.get("/verify");
    const { user, token: newToken } = res.data || {};

    const effectiveToken = newToken || localStorage.getItem("token");
    if (effectiveToken) {
      localStorage.setItem("token", effectiveToken);
      setAuthToken(effectiveToken);
    }

    dispatch(loginSuccess({ user, token: effectiveToken || null }));
    return user;
  } catch (err) {
    console.log("Error: ", err);
    localStorage.removeItem("token");
    setAuthToken(null);
    dispatch(logout());
    dispatch(loginFail("Session expired or unauthorized"));
    return null;
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  setAuthToken(null);
  dispatch(logout());
};