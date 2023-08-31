// reducers/usersReducer.js

const initialState = {
  paymentData: null,
  error: null,
};

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_PAYMENT_SUCCESS":
      return {
        ...state,
        paymentData: action.payload,
        error: null,
      };

    default:
      return state;
  }
};

export default paymentReducer;
