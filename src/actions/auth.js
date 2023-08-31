import * as api from "../api/index";
import { setCurrentUser } from "./currentUser";

export const signup = (authData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await api.signUp(authData);
    dispatch({ type: "AUTH_SUCCESS", data: data });

    // dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    navigate("/");
  } catch (error) {
    console.log(error.message);
    dispatch({ type: "AUTH_FAIL" });
  }
};
export const login = (authData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await api.logIn(authData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
    // dispatch({ type: "AUTH", data });
    navigate("/");
  } catch (error) {
    alert("Credentials doesn't match..");

    console.log(error.message);
    dispatch({ type: "AUTH_FAIL" });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: "LOG_OUT" });
  alert("Logged out successfully");
};
