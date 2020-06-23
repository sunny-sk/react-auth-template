import React, { useEffect } from "react";
import { isAuth, authenticate } from "../helper/auth";
import axios from "axios";
import { ToastProvider, useToasts } from "react-toast-notifications";
import { Redirect, Link } from "react-router-dom";
import { useState } from "react";
import url from "../contants/url";
const Register = () => {
  const { addToast } = useToasts();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const displayNoti = (msg, type) => {
    addToast(msg, {
      appearance: type,
      autoDismiss: true,
      autoDismissTimeout: 2000,
    });
  };
  const { name, email, password, password2 } = formData;
  const onChangeData = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      displayNoti("Password do not match", "error");
      return;
    } else if (!name || !email || !password || !password2) {
      displayNoti("Please fill all fields", "error");
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(`${url.register}`, {
        name,
        email,
        password,
      });
      setIsLoading(false);
      console.log(response);
      if (response.data.success && response.data.code === 201) {
        displayNoti("Registerd successfully", "success");
        authenticate(response.data.user, () => {
          setFormData({
            name: "",
            email: "",
            password: "",
            password2: "",
          });
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error.response.data);
      if (error.response && error.response.data) {
        displayNoti(error.responsed.data.message, "error");
      }
    }
  };

  return (
    <>
      <div className="container">
        {isAuth() ? <Redirect to="/" /> : null}
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Create Your Account
        </p>
        <form autoComplete="off" className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              autoComplete="off"
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => onChangeData(e)}
              required
            />
          </div>
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
            <small className="form-text">
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className="form-group">
            <input
              autoComplete="off"
              type="password"
              placeholder="Password"
              name="password"
              minLength="5"
              value={password}
              onChange={(e) => onChangeData(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              autoComplete="off"
              type="password"
              placeholder="Confirm Password"
              name="password2"
              minLength="5"
              value={password2}
              onChange={(e) => onChangeData(e)}
              required
            />
          </div>
          <div style={{ height: "65px" }}>
            {isLoading ? (
              <div className="text-center">
                <div className="lds-dual-ring"></div>
              </div>
            ) : (
              <button type="submit" className="btn btn-primary btn-block">
                Signup
              </button>
            )}
          </div>

          <div className="">
            <p>or </p>
          </div>

          <div style={{ height: "65px" }}>
            {!isLoading && (
              <Link className="btn btn-dark btn-block" to="/login">
                Signin
              </Link>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
