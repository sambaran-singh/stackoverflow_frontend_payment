// export const getUser = (id) => async (dispatch) => {
//   try {
//     const { data } = await api.getUser(id);
//     dispatch({ type: "FETCH_CURRENT_USER", payload: data });
//   } catch (err) {
//     console.log(err);
//   }
// };
import * as api from "../api/index";
export const getUserDataSuccess = (userData) => ({
  type: "GET_USER_DATA_SUCCESS",
  payload: userData,
});

export const getUserData = (userId) => async (dispatch) => {
  try {
    const response = await api.getUser(userId);

    dispatch(getUserDataSuccess(response));
  } catch (error) {
    console.log(error);
  }
};

export const getuserData = (userId) => async (dispatch) => {
  try {
    const { data } = await api.getUserData(userId);
    dispatch({ type: "GET_USER_DATA", payload: data });
  } catch (error) {
    console.log(error);
  }
};
