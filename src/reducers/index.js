import { combineReducers } from "redux";
import authReducer from "./auth";
import currentUserReducer from "./currentUser";
import questionsReducer from "./questions";
import usersReducer from "./users";
import paymentReducer from "./payment";
import subscriptionReducer from "./subscription";
import updatedUserReducer from "./userDetails";
import postReducer from "./PostReducer";
export default combineReducers({
  authReducer,
  currentUserReducer,
  questionsReducer,
  usersReducer,
  paymentReducer,
  subscriptionReducer,
  updatedUserReducer,
  postReducer,
});
