const initialState = {
  userData: null,
  error: null,
};

const updatedUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_DATA_SUCCESS":
      return {
        ...state,
        userData: action.payload,
        error: null,
      };
    case "GET_USER_DATA_FAILURE":
      return {
        ...state,
        userData: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default updatedUserReducer;
