import request from "../utils/request";
const URL = "https://139.180.144.147/api";
export const getAllFormService = (payload) => {
  return request(`${URL}/Forms/get-all/${payload.url}`, {
    method: "POST",
    data: payload,
  });
};
export const getDetailFormService = (id) => {
  return request(`${URL}/Forms/get-detail/${id}`, {
    method: "POST",
    data: id,
  });
};
export const createFormService = (params) => {
  return request(`${URL}/Forms/create`, {
    method: "POST",
    data: params,
  });
};
export const updateFormService = (id) => {
  return request(`${URL}/Forms/update/${id}`, {
    method: "POST",
    data: id,
  });
};
export const approveFormService = (id) => {
  return request(`${URL}/Forms/approve/${id}`, {
    method: "POST",
    data: id,
  });
};
export const rejectFormService = (id) => {
  return request(`${URL}/Forms/reject/${id}`, {
    method: "POST",
    data: id,
  });
};
export const deleteFormService = (id) => {
  return request(`${URL}Forms/delete/${id}`, {
    method: "POST",
    data: id,
  });
};
