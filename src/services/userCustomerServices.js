import Axios, { AuthAxios } from "./axiosConfig";

export function getUserCustomer() {
  return AuthAxios.get("/customer/me");
}

export function getCustomerAddresses(customerId) {
  const requestBody = {
    CustomerId: customerId,
  };
  return AuthAxios.post("/customer/address/search", requestBody);
}

export function addCustomerAddress(data) {
  return AuthAxios.post("/customer/address/add", data);
}

export function deleteCustomerAddress(customerId, AddressId) {
  const requestBody = {
    Id: AddressId,
    CustomerId: customerId,
  };
  return AuthAxios.post("/customer/address/delete", requestBody);
}
