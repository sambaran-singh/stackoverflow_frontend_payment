const updatedUserReducer = (state = { Data: null }, action) => {
  switch (action.type) {
    case "GET_USER_DATA":
      return { ...state, Data: action.payload };
    default:
      return state;
  }
};

export default updatedUserReducer;
