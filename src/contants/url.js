let BASE_URL = "";
if (process.env.base === "production") {
  BASE_URL = "https://public-auth.herokuapp.com";
} else {
  BASE_URL = "http://localhost:8100";
}

export default {
  verifyEmail: BASE_URL + "/api/v1/users/verifyEmail",
  login: BASE_URL + "/api/v1/auth/signin",
  register: BASE_URL + "/api/v1/auth/signup",
  loginUsingGoogle: BASE_URL + "/api/v1/auth/signin/google",
  loginUsingFacebook: BASE_URL + "/api/v1/auth/signin/facebook",
  loginUsingGithub: BASE_URL + "/api/v1/auth/signin/github",
  sendForgotPasswordLink: BASE_URL + "/api/v1/users/forgotPassword/sendLink",
  changePasswordUsingLink: BASE_URL + "/api/v1/users/changePasswordUsingLink",
};
