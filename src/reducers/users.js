const usersReducer = (states = [], action) => {
  switch (action.type) {
    case "UPDATE_CURRENT_USER":
      return states.map((state) =>
        state._id === action.payload._id ? action.payload : state
      );
    case "FETCH_USERS":
      return action.payload;

    case "UPDATE_CURRENT_USER1":
      return {
        ...states,
        result: action.payload,
      };

    // case "FETCH_CURRENT_USER":
    //   return action.payload;
    // case "UPDATE_CURRENT_USER":
    //   return states.map((state) =>
    //     state._id === action.payload._id ? action.payload : state
    //   );

    // case "UPDATE_PAYMENT":
    //   return action.payload;
    // case "CURRENT_USER":
    //   return states.map((state) =>
    //     state._id === action.payload._id ? action.payload : state
    //   );
    // case "CURRENT_USER":
    //   return { ...states, ...action.payload };

    default:
      return states;
  }
};

export default usersReducer;
