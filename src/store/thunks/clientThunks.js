import axiosInstance from "../../api/axiosInstance";
import { setRoles } from "../actions/clientActions";

export const fetchRolesIfNeeded = () => {
  return async (dispatch, getState) => {
    
    const currentRoles = getState().client.roles;

    if (Array.isArray(currentRoles) && currentRoles.length > 0) {
      return;
    }


    try {
      const res = await axiosInstance.get("/roles");

    
      const roles = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.roles)
        ? res.data.roles
        : [];

   
      dispatch(setRoles(roles));
    } catch (err) {
      console.error("fetchRolesIfNeeded failed:", err);
     
    }
  };
};