import {
    GET_ALL_SYSTEM_SERVICES,
    SAVE_ALL_SYSTEM_SERVICES,
    CREATE_SYSTEM_SERVICES,
    GET_DETAIL_SYSTEM_SERVICES,
    UPDATE_SYSTEM_SERVICES,
    DELETE_SYSTEM_SERVICES,
    GET_RULES_SYSTEM_SERVICES,
} from "./constants";

export function getAllSystemServicesAction(payload) {
    return { type: GET_ALL_SYSTEM_SERVICES, payload }
}

export function saveAllSystemServicesAction(payload) {
    return { type: SAVE_ALL_SYSTEM_SERVICES, payload }
}

export const asyncGetAllSystemServicesAction = (dispatch) => (payload) =>
    new Promise((resolve) =>
        dispatch({ type: GET_ALL_SYSTEM_SERVICES, payload, resolve })
    );
//** ---------------------CREATE SYSTEM_SERVICES---------------------- */
export const asyncCreateSystemServicesAction = (dispatch) => (payload) =>
    new Promise((resolve) =>
        dispatch({ type: CREATE_SYSTEM_SERVICES, payload, resolve })
    );
//** ---------------------GET SYSTEM_SERVICES DETAIL---------------------- */
export const asyncGetDetailSystemServicesAction = (dispatch) => (payload) =>
    new Promise((resolve) =>
        dispatch({ type: GET_DETAIL_SYSTEM_SERVICES, payload, resolve })
    );
//** ---------------------UPDATE SYSTEM_SERVICES---------------------- */
export const asyncUpdateSystemServicesAction = (dispatch) => (payload) =>
    new Promise((resolve) =>
        dispatch({ type: UPDATE_SYSTEM_SERVICES, payload, resolve })
    );
//** ---------------------DELETE SYSTEM_SERVICES---------------------- */
export const asyncDeleteSystemServicesAction = (dispatch) => (payload) =>
    new Promise((resolve) =>
        dispatch({ type: DELETE_SYSTEM_SERVICES, payload, resolve })
    );
//** ---------------------GET RULES SYSTEM_SERVICES---------------------- */
export const asyncGetRulesSystemServicesAction = (dispatch) => (payload) =>
    new Promise((resolve) =>
        dispatch({ type: GET_RULES_SYSTEM_SERVICES, payload, resolve })
    );
