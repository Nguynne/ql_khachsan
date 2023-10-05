import request from "./../utils/request";
const BASE_URL = "https://139.180.144.147/api";

export function getAllSystemServicesService(payload) {
  return request(`${BASE_URL}/services/get-all`, {
    method: "POST",
    data: payload,
  });
}

export function createSystemServicesService(payload) {
  return request(`${BASE_URL}/services/create`, {
    method: "POST",
    data: payload,
  });
}

export function getDetailSystemServicesService(payload) {
  return request(`${BASE_URL}/services/get-detail/${payload}`, {
    method: "POST",
    data: payload,
  });
}

export function updateSystemServicesService(payload) {
  return request(`${BASE_URL}/services/update/${payload.id}`, {
    method: "POST",
    data: payload,
  });
}

export function deleteSystemServicesService(payload) {
  return request(`${BASE_URL}/services/delete/${payload}`, {
    method: "POST",
    data: payload,
  });
}

export function getRulesSystemServicesService(payload) {
  return request(`${BASE_URL}/services/get-rules/`, {
    method: "POST",
    data: payload,
  });
}
