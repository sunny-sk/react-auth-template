import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ToastProvider, useToasts } from "react-toast-notifications";
import Routes from "./Router";

ReactDOM.render(
  <ToastProvider>
    <React.StrictMode>
      <Routes />
    </React.StrictMode>
  </ToastProvider>,
  document.getElementById("root")
);
