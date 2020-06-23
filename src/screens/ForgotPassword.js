import React from "react";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import { useState } from "react";
import url from "../contants/url";
const ForgotPassword = () => {
  const { addToast } = useToasts();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const displayNoti = (msg, type) => {
    addToast(msg, {
      appearance: type,
      autoDismiss: true,
      autoDismissTimeout: 2000,
    });
  };
  const { email } = formData;
  const onChangeData = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      displayNoti("Please fill all fields", "error");
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(`${url.sendForgotPasswordLink}`, {
        email: email.trim(),
      });
      setIsLoading(false);
      console.log(response.data);
      if (response.data.success && response.data.code === 200) {
        displayNoti(response.data.message, "success");
        setFormData({ email: "" });
        return;
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.data) {
        displayNoti(error.response.data.message, "error");
      }
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="large text-primary">Forgot Password ?</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Send Reset Password Link
        </p>
        <form autoComplete="off" className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              autoComplete="off"
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => onChangeData(e)}
              required
            />
          </div>

          {isLoading ? (
            <div className="">
              <div className="lds-dual-ring"></div>
            </div>
          ) : (
            <button type="submit" className="btn btn-primary">
              Send reset password Link
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
