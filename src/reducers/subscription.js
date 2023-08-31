const initialState = {
  subscription: "Free", // Initial subscription value
};

// Reducer function
const subscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_SUBSCRIPTION":
      return {
        ...state,
        subscription: action.payload,
      };
    default:
      return state;
  }
};

export default subscriptionReducer;
