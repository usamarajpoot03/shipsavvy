import Axios, { AuthAxios } from "./axiosConfig";

export function getAddressDetails(addressId) {
  const requestBody = {
    Id: addressId,
    IncludeRelated: true,
  };
  return AuthAxios.post("/address/search", requestBody);
}
export function getAllAddress() {
  const requestBody = {
    IncludeRelated: true,
  };
  return AuthAxios.post("/address/search", requestBody);
}
