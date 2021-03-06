import Axios, { AuthAxios } from "./axiosConfig";

export function userLogin({ username, password }) {
  const rqstBody = {
    Username: username,
    Password: password,
  };
  return Axios.post("/identity/registration/signIn", rqstBody, {
    headers: { "Content-Type": "application/json" },
  });
}

export function userLogoutService() {
  return AuthAxios.post("/identity/registration/signOut", {});
}

export function setUserToLocalStorage({ AccessToken, ...user }) {
  localStorage.setItem("token", AccessToken);
  localStorage.setItem("userData", JSON.stringify(user));
}

export function getLoggedInUser() {
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("userData"));
  // return  valid token if it is in session storage or local storage
  if (token && userData) {
    return userData;
  } else return null;
}

export function getUserToken() {
  const token = localStorage.getItem("token");
  if (token) {
    return token;
  } else return "";
}

export function clearUserStorage() {
  localStorage.removeItem("token");
  localStorage.removeItem("userData");
}
export async function userLogout(redirectLocation = "/login", serviceCall) {
  if (serviceCall) {
    try {
      await userLogoutService();
    } catch (err) {}
  }
  clearUserStorage();
  window.location.replace(redirectLocation);
}
