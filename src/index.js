import { createStore } from "redux";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import { throttle } from "lodash";

import todoAppReducer from "./reducers";
import TodoApp from "./components/App";
import { loadState, saveState } from "./localStorage";

const persistedState = loadState();
const store = createStore(todoAppReducer, persistedState);

store.subscribe(
  throttle(() => {
    saveState({ todos: store.getState().todos });
  }, 1000)
);

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById("root")
);
