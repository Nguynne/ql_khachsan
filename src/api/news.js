import request from "./../utils/request";
const BASE_URL = "https://139.180.144.147/api";

export function getAllNewsService(payload) {
  return request(`${BASE_URL}/news/get-all`, {
    method: "POST",
    data: payload,
  });
}

export function createNewsService(payload) {
  return request(`${BASE_URL}/news/create`, {
    method: "POST",
    requestType: "form",
    data: payload,
  });
}

export function getDetailNewsService(payload) {
  return request(`${BASE_URL}/news/get-detail/${payload}`, {
    method: "POST",
    data: payload,
  });
}

export function updateNewsService(payload) {
  return request(`${BASE_URL}/news/update/${payload.get("id")}`, {
    method: "POST",
    requestType: "form",
    data: payload,
  });
}

export function deleteNewsService(payload) {
  return request(`${BASE_URL}/news/delete/${payload}`, {
    method: "POST",
    data: payload,
  });
}
