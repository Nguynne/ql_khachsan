import {
  SET_LOADING,
  SAVE_LOADING,
  GET_ALL_PROFILE,
  SAVE_ALL_PROFILE,
  EDIT_USER,
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
export const asyncgetAllProfileAction = (dispatch) => (payload) => {
  return new Promise((resolve) => {
    dispatch({ type: GET_ALL_PROFILE, payload, resolve });
  });
};
export function saveAllProfileAction(payload) {
  return {
    type: SAVE_ALL_PROFILE,
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
// edit
export const asyncEditUserAction = (dispatch) => (payload) =>
  new Promise((resolve) => dispatch({ type: EDIT_USER, payload, resolve }));
