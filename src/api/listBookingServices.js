import request from "./../utils/request";
const BASE_URL = "https://139.180.144.147/api";

export function getAllListBookingServicesService(payload) {
  return request(`${BASE_URL}/services/get-all-booking`, {
    method: "POST",
    data: payload,
  });
}
