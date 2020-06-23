import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import Register from "./screens/Register";
import ForgotPassword from "./screens/ForgotPassword";
import ResetPasswordUsingLink from "./screens/ResetPasswordUsingLink";
import Login from "./screens/Login";
import Activation from "./screens/Activation";

export default function Routes() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={(props) => <App {...props} />} />
          <Route
            path="/register"
            exact
            render={(props) => <Register {...props} />}
          />
          <Route
            path="/forgotPassword"
            exact
            render={(props) => <ForgotPassword {...props} />}
          />
          <Route
            path="/user/password/reset/:token"
            exact
            render={(props) => <ResetPasswordUsingLink {...props} />}
          />
          <Route path="/login" exact render={(props) => <Login {...props} />} />
          <Route
            path="/user/activation/email/:token"
            exact
            render={(props) => <Activation {...props} />}
          />
        </Switch>
      </BrowserRouter>
    </>
  );
}
