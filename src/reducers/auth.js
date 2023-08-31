// const authReducer = (state = {}, actions) => {
//   switch (actions.type) {
//     case "AUTH":
//       localStorage.setItem("Profile", JSON.stringify({ ...actions?.data }));
//       return { ...state, data: actions?.data };
//     case "LOGOUT":
//       localStorage.clear();
//       return { ...state, data: null };

//     default:
//       return state;
//   }
// };

// export default authReducer;

const authReducer = (
  state = {
    authData: null,
    loading: false,
    error: false,
    updateLoading: false,
  },
  action
) => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, loading: true, error: false };
    case "AUTH_SUCCESS":
      localStorage.setItem("Profile", JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, error: false };
    case "AUTH_FAIL":
      return { ...state, loading: false, error: true };
    case "UPDATING_START":
      return { ...state, updateLoading: true, error: false };
    case "UPDATING_SUCCESS":
      localStorage.setItem("Profile", JSON.stringify({ ...action?.data }));
      return {
        ...state,
        authData: action.data,
        updateLoading: false,
        error: false,
      };

    case "UPDATING_FAIL":
      return { ...state, updateLoading: true, error: true };

    case "LOG_OUT":
      localStorage.clear();
      return {
        ...state,
        authData: null,
        loading: false,
        error: false,
        updateLoading: false,
      };

    case "FOLLOW_USER":
      return {
        ...state,
        authData: {
          ...state.authData,
          result: {
            ...state.authData.result,
            following: [...state.authData.result.following, action.data],
          },
        },
      };

    case "UNFOLLOW_USER":
      return {
        ...state,
        authData: {
          ...state.authData,
          result: {
            ...state.authData.result,
            following: [
              ...state.authData.result.following.filter(
                (personId) => personId !== action.data
              ),
            ],
          },
        },
      };
    case "USER_VERIFIED":
      localStorage.setItem("Profile", JSON.stringify({ ...action?.data }));
      return {
        ...state,
        authData: action.data,
        updateLoading: false,
        error: false,
      };

    default:
      return state;
  }
};

export default authReducer;
