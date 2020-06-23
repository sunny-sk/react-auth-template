import React, { useEffect } from "react";
import { isAuth, authenticate } from "../helper/auth";
import axios from "axios";
import { ToastProvider, useToasts } from "react-toast-notifications";
import { Redirect, Link } from "react-router-dom";
import { useState } from "react";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GitHubLogin from "react-github-login";
import url from "../contants/url";
const Login = (props) => {
  const { addToast } = useToasts();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onLoginUsingGithub = async (id) => {
    try {
      setIsLoading(true);
      const response = await axios.post(url.loginUsingGithub, {
        code: id,
      });
      setIsLoading(false);
      if (response.data.code === 200 && response.data.success) {
        addToast("Sign in successfully", {
          appearance: "success",
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });
        authenticate(response.data.user, () => {
          isAuth() && props.history.push("/");
        });
      } else if (response.data.code === 201 && response.data.success) {
        addToast("registered and Sign in successfully", {
          appearance: "success",
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });
        authenticate(response.data.user, () => {
          isAuth() && props.history.push("/");
        });
      }
      console.log(response);
    } catch (error) {
      setIsLoading(false);
      if (error.response.data) {
        addToast(error.response.data.message, {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });
      }
    }
  };

  useEffect(() => {
    if (
      props.history.location.search
        .toString()
        .substring(1, props.history.location.search.length)
        .split("=")[0] === "code"
    ) {
      console.log("login using github");
      onLoginUsingGithub(
        props.history.location.search
          .toString()
          .substring(1, props.history.location.search.length)
          .split("=")[1]
      );
    } else {
      console.log("not valid id for github");
    }
  }, []);
  const displayNoti = (msg, type) => {
    addToast(msg, {
      appearance: type,
      autoDismiss: true,
      autoDismissTimeout: 2000,
    });
  };

  const { email, password } = formData;
  const onChangeData = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      displayNoti("Please fill all fields", "error");
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(`${url.login}`, { email, password });
      setIsLoading(false);
      console.log(response);
      if (response.data.success && response.data.code === 200) {
        displayNoti("Sign in successfully", "success");
        authenticate(response.data.user, () => {
          setFormData({
            email: "",
            password: "",
          });
        });
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.data) {
        displayNoti(error.response.data.message, "error");
      }
    }
  };

  const loginUsingGoogle = async (tokenId) => {
    console.log("login using google");
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${url.loginUsingGoogle}`,

        {
          tokenId: tokenId,
        }
      );
      setIsLoading(false);
      if (res.data.success) {
        authenticate(res.data.user, () => {
          isAuth() && props.history.push("/");
        });
        displayNoti("Signin successfully", "success");
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.data) {
        displayNoti(error.response.data.message, "error");
      }
    }
  };

  const responseGoogle = (res) => {
    loginUsingGoogle(res.tokenId);
  };

  const errResponseGoogle = (error) => {};
  const responseFacebook = async (response) => {
    console.log("login using facebook");
    const { email, id, name } = response;
    setIsLoading(true);
    try {
      const res = await axios.post(`${url.loginUsingFacebook}`, {
        email,
        id,
        name,
      });
      setIsLoading(false);
      if (res.data.success) {
        authenticate(res.data.user, () => {
          isAuth() && props.history.push("/");
        });
        addToast(res.data.message, {
          appearance: "success",
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response.data) {
        addToast(error.response.data.message, {
          appearance: "error",
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });
      }
    }
  };
  const componentClicked = () => {};

  const test = async () => {
    try {
      if (!window.FB) return;
      window.FB.getLoginStatus((res) => {
        console.log(res);
        if (res.status === "connected") {
          window.FB.api("/me", { fields: "email,name,picture" }, function (
            response
          ) {
            responseFacebook({
              email: response.email,
              id: response.id,
              name: response.name,
            });
          });
        } else {
          window.FB.login((res) => {
            if (res.status === "connected") {
              window.FB.api("/me", { fields: "email,name,picture" }, function (
                response
              ) {
                responseFacebook({
                  email: response.email,
                  id: response.id,
                  name: response.name,
                });
              });
            }
          });
        }
      });
    } catch (error) {}
  };
  return (
    <>
      <div className="container">
        {/* depend on redirect to user dashboard or admin dashbaord */}
        {isAuth() ? <Redirect to="/" /> : null}
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Just one step ahead Your Account
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
            <div className="text-right">
              <Link className="mr-0" to="/forgotPassword">
                Forgot Password?
              </Link>
            </div>
          </div>

          {!isLoading ? (
            <div>
              <button type="submit" className="btn btn-block btn-primary">
                Signin
              </button>
              <div className="text-center mb-3 mt-4">
                <p style={{ display: "inline-block", marginBottom: "0px" }}>
                  Don't have an account?
                </p>
                <Link className="ml-3" to="/register">
                  Register here
                </Link>
              </div>
              <div className="text-center">
                <p>Or</p>
              </div>

              <div className="text-center">
                <GoogleLogin
                  clientId="830257501118-ctr1rjifqj9ogurs6dr5pt4dfdnrda5u.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={errResponseGoogle}
                  cookiePolicy={"single_host_origin"}
                />

                {/* <FacebookLogin
                  appId="2385195895111371"
                  autoLoad={false}
                  cssClass="facebook-btn"
                  fields="name,email,picture"
                  onClick={componentClicked}
                  callback={responseFacebook}
                  icon="fa-facebook"
                  textButton="&nbsp; Login"
                /> */}
                <button
                  className="btn ml-2"
                  style={{
                    padding: "11px 8px",
                    color: "#ffff",
                    background: "#3B5998",
                    outline: "none",
                  }}
                  type="button"
                  onClick={() => {
                    test();
                  }}
                >
                  <i className="fab fa-facebook"></i> facebook
                </button>
                <a
                  href="https://github.com/login/oauth/authorize?client_id=27d8c4e7c0dd6c70e431"
                  className="btn"
                  style={{
                    padding: "11px 8px",
                    outline: "none",
                  }}
                  type="button"
                >
                  <i className="fab fa-github"></i> github
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="lds-dual-ring"></div>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default Login;
