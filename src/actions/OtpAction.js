import * as api from "../api/index.js";
export const verifyOTP = (userId, otp, navigate) => async (dispatch) => {
  try {
    const { data } = await api.CheckOTP({ userId, otp });
    console.log(data);
    await dispatch({ type: "USER_VERIFIED", data: data });
    navigate("/ChatBot");
  } catch (error) {
    console.log(error);
  }
};
