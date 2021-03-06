import { Provider } from "react-redux";
import React from "react";

import TodoApp from "./App";

const Root = ({ store }) => (
  <Provider store={store}>
    <TodoApp />
  </Provider>
);

export default Root;
