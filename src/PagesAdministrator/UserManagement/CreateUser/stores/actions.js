import {
  SET_LOADING,
  SAVE_LOADING,
  GET_ALL_USER,
  SAVE_ALL_USER,
  CREAT_USER,
  GET_ALL_ROOM,
  SAVE_ALL_ROOM,
  GET_ALL_ROLE,
  SAVE_ALL_ROLE,
} from "./constants";
// loading
export function setLoading(payload) {
  return {
    type: SET_LOADING,
    payload,
  };
}

export function saveLoading(payload) {
  return {
    type: SAVE_LOADING,
    payload,
  };
}
// get
export function getAllUserRequestAction(payload) {
  return {
    type: GET_ALL_USER,
    payload,
  };
}
export const asyncetAllUserRequestAction = (dispatch) => (payload) =>
  new Promise((resolve) => dispatch({ type: GET_ALL_USER, payload, resolve }));
export function saveAllUserAction(payload) {
  return {
    type: SAVE_ALL_USER,
    payload,
  };
}
// get
export function saveRoomAction(payload) {
  return {
    type: SAVE_ALL_ROOM,
    payload,
  };
}
export function getRoomAction(payload) {
  return {
    type: GET_ALL_ROOM,
    payload,
  };
}
// get
export function saveRoleAction(payload) {
  return {
    type: SAVE_ALL_ROLE,
    payload,
  };
}
export function getRoleAction(payload) {
  return {
    type: GET_ALL_ROLE,
    payload,
  };
}
// create
export const asyncCreateUserAction = (dispatch) => (payload) =>
  new Promise((resolve) => dispatch({ type: CREAT_USER, payload, resolve }));
