import React from "react";
import "./App.css";
import { signout, isAuth } from "./helper/auth";
import { Redirect } from "react-router-dom";
import { ToastProvider, useToasts } from "react-toast-notifications";
function App() {
  const { addToast } = useToasts();
  const logout = () => {
    signout(() => {
      console.log("logout");
      addToast("logout successfully", {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
      console.log(isAuth());
    });
  };
  return (
    <div className="App">
      {!isAuth() ? <Redirect to="/login" /> : null}
      <div className="container">
        <h1 className="large text-primary">Welcome</h1>
        {isAuth() && (
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        )}
        <br />
      </div>
    </div>
  );
}

export default App;
