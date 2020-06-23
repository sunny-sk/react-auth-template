import React, { useEffect } from "react";
import { isAuth, authenticate } from "../helper/auth";
import axios from "axios";
// import { ToastProvider, useToasts } from "react-toast-notifications";
import { Redirect, Link } from "react-router-dom";
import { useState } from "react";
import url from "../contants/url";
const ResetPasswordUsingLink = (props) => {
  // const { addToast } = useToasts();
  const [formData, setFormData] = useState({
    newPassword: "",
    newPassword2: "",
  });
  const [token, setToken] = useState(props.match.params.token);
  useEffect(() => {
    setToken(props.match.params.token);
  }, [props.match.params.token]);

  const { newPassword, newPassword2 } = formData;
  const onChangeData = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword || !newPassword2) {
      // addToast("Please fill all fields", {
      //   appearance: "info",
      //   autoDismiss: true,
      //   autoDismissTimeout: 3000,
      // });
      return;
    } else if (newPassword !== newPassword2) {
      // addToast("password do not match", {
      //   appearance: "error",
      //   autoDismiss: true,
      //   autoDismissTimeout: 3000,
      // });
      return;
    }
    try {
      const response = await axios.post(
        `${url.changePasswordUsingLink}/${token}`,
        {
          newPassword: newPassword,
        }
      );
      if (response.data.success && response.data.code === 200) {
        // addToast(response.data.message, {
        //   appearance: "success",
        //   autoDismiss: true,
        //   autoDismissTimeout: 3000,
        // });
        setFormData({
          newPassword: "",
          newPassword2: "",
        });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // addToast(error.response.data.message, {
        //   appearance: "error",
        //   autoDismiss: true,
        //   autoDismissTimeout: 3000,
        // });
      }
    }
  };

  return (
    <>
      <div className="container">
        {/* depend on redirect to user dashboard or admin dashbaord */}

        <h1 className="large text-primary">Reset Password ?</h1>
        <p className="lead">
          <i className="fas fa-user"></i> set your new password for xyz app
        </p>
        <form autoComplete="off" className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              autoComplete="off"
              type="password"
              placeholder="Password"
              name="newPassword"
              value={newPassword}
              onChange={(e) => onChangeData(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              autoComplete="off"
              type="password"
              placeholder="Confirm Password"
              name="newPassword2"
              value={newPassword2}
              onChange={(e) => onChangeData(e)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Set password
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPasswordUsingLink;
