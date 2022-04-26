import Axios, { AuthAxios } from "./axiosConfig";

export function getUserInfo() {
  return AuthAxios.get("/identity/user/me");
}

export function updateUserInfo(user) {
  return AuthAxios.put("/identity/user/update", user);
}
