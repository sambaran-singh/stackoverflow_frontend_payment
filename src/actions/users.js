import * as api from "../api/index";

export const fetchAllUsers = () => async (dispatch) => {
  try {
    const { data } = await api.fetcAllUsers();
    dispatch({ type: "FETCH_USERS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = (id, updateData) => async (dispatch) => {
  try {
    const { data } = await api.updateProfile(id, updateData);
    dispatch({ type: "UPDATE_CURRENT_USER", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateSubscription = (id, type) => async (dispatch) => {
  try {
    const { data } = await api.updateSubscription({ id, type });
    dispatch({ type: "UPDATE_SUBSCRIPTION", payload: data });
  } catch (error) {
    console.log(error);
  }
};

// export const updateSubscription = (id, type) => async (dispatch) => {
//   try {
//     const { SubscribeData } = await api.updateSubscription({ id, type });
//     dispatch({ type: "UPDATE_SUBSCRIPTION", payload: SubscribeData });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const updatePayment = (name, email, paymentMethod, productId) => {
  return async () => {
    try {
      const response = await api.subscribe(
        name,
        email,
        paymentMethod,
        productId
      );
      return response;
    } catch (err) {
      throw err;
    }
  };
};

export const updateCurrentUser = (updateData) => async (dispatch) => {
  try {
    const data = await api.currentUsers(updateData);
    dispatch({ type: "CURRENT_USER", payload: data });
  } catch (error) {
    console.log(error);
  }
};
