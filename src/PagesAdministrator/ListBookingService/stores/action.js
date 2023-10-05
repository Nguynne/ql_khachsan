import { GET_ALL_LIST_BOOKING_SERVICES, SAVE_ALL_LIST_BOOKING_SERVICES } from "./constants";

export function getAllListBookingServicesAction(payload) {
    return { type: GET_ALL_LIST_BOOKING_SERVICES, payload }
}

export function saveAllListBookingServicesAction(payload) {
    return { type: SAVE_ALL_LIST_BOOKING_SERVICES, payload }
}

export const asyncGetAllListBookingServicesAction = (dispatch) => (payload) =>
    new Promise((resolve) =>
        dispatch({ type: GET_ALL_LIST_BOOKING_SERVICES, payload, resolve })
    );