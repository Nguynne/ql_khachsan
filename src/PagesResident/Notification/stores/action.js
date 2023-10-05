import { GET_ALL_NOTIFICATION_SERVICES, SAVE_ALL_NOTIFICATION_SERVICES } from "./constants";

export function getAllNotificationServicesAction(payload) {
    return { type: GET_ALL_NOTIFICATION_SERVICES, payload }
}

export function saveAllNotificationServicesAction(payload) {
    return { type: SAVE_ALL_NOTIFICATION_SERVICES, payload }
}

export const asyncGetAllNotificationServicesAction = (dispatch) => (payload) =>
    new Promise((resolve) =>
        dispatch({ type: GET_ALL_NOTIFICATION_SERVICES, payload, resolve })
    );