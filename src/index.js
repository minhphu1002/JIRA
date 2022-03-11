import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

import store from "./redux/configStore";
import { Provider } from "react-redux";
import "antd/dist/antd.css";
import { Router } from "react-router-dom";
import { history } from "./util/history";

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);
