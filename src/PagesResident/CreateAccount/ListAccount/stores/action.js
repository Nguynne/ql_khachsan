import {
  GET_ACCOUNT,
  SAVE_ACCOUNT,
  SAVE_LOADING,
  SET_LOADING,
} from "./constants";

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
export function getAccountAction(payload) {
  return {
    type: GET_ACCOUNT,
    payload,
  };
}
export const asyncGetAccountAction = (dispatch) => (payload) =>
  new Promise((resolve) => dispatch({ type: GET_ACCOUNT, payload, resolve }));
export function saveAccountAction(payload) {
  return {
    type: SAVE_ACCOUNT,
    payload,
  };
}
