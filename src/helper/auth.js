export const _setLocalStorage = (key, value) => {
  if (Window !== "undefined") localStorage.setItem(key, JSON.stringify(value));
};
export const removeLocalStorage = (key) => {
  if (Window !== "undefined") localStorage.removeItem(key);
};

//signout  function
export const signout = async (next) => {
  try {
    if (Window !== "undefined") {
      localStorage.removeItem("user");
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

// store data to localstorage
export const authenticate = (response, next) => {
  _setLocalStorage("user", response);
  next();
};

//check whether user is authenticate or not
export const isAuth = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(localStorage.getItem("user"));
  } else {
    return false;
  }
};

//update user in localstorage
export const updateLocalStorage = (response, next) => {
  if (typeof window !== "undefined") {
    let auth = JSON.parse(localStorage.getItem("user"));
    localStorage.setItem("user", JSON.stringify(response));
    next();
  }
};
