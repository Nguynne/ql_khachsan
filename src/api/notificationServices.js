import request from "./../utils/request";
const BASE_URL = "https://139.180.144.147/api";

export function getAllNotificationServicesService(payload) {
  return request(`${BASE_URL}/Notifications/get-all`, {
    method: "POST",
    data: payload,
  });
}
