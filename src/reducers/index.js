import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import auth from "./auth";
import posts from "./posts";
import network from "./network";

const entities = combineReducers({
  posts,
});

const rootReducer = combineReducers({
  entities,
  form,
  auth,
  network
});

export default rootReducer;
