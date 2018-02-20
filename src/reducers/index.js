import { combineReducers } from "redux";
import todos from "./todos";
import visibilityFilter from "./visibilityFilter";

const todoAppReducer = combineReducers({
  todos: todos,
  visibilityFilter: visibilityFilter
});

export default todoAppReducer;
