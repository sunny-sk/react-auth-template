import React, { useEffect, useState } from "react";
import axios from "axios";
// import { ToastProvider, useToasts } from "react-toast-notifications";
import url from "../contants/url";

const Activation = (props) => {
  // const { addToast } = useToasts();
  const [token, setToken] = useState(props.match.params.token);
  useEffect(() => {
    console.log(props.match.params.token);
    setToken(props.match.params.token);
  }, [props.match.params.token]);

  const onVerifyEmail = async () => {
    try {
      //check for the token
      if (!false) {
        console.log("token not found");
      }
      // hit verify email api
      const response = await axios.post(`${url.verifyEmail}/${token}`, {});
      console.log(response.data);
      if (response.data && response.data.success) {
        // addToast("email verified successfully", {
        //   appearance: "success",
        //   autoDismiss: true,
        //   autoDismissTimeout: 3000,
        // });
        return;
      }
      // display message
    } catch (error) {
      //dsplay error
      if (error.response.data && !error.response.data.success) {
        // addToast(error.response.data.message, {
        //   appearance: "error",
        //   autoDismiss: true,
        //   autoDismissTimeout: 3000,
        // });
      }
    }
  };
  return (
    <div className="container text-center">
      <p className="lead">Click below to Verify your email</p>
      <button className="btn btn-primary" onClick={() => onVerifyEmail()}>
        Verify
      </button>
    </div>
  );
};

export default Activation;
