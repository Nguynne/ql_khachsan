import request from "../utils/request";
const URL = "https://139.180.144.147/api";
//create
export const createAccountService = (params) => {
  return request(`${URL}/Residence/create-user`, {
    method: "POST",
    data: params,
  });
};
//all-account
export const getAllAccountService = (params) => {
  return request(`${URL}/Residence/get-all-users`, {
    method: "POST",
    data: params,
  });
};
//
export const getDashboardService = (params) => {
  return request(`${URL}/Residence/get-dashboard`, {
    method: "POST",
    data: params,
  });
};
