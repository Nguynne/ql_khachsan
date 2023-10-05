import { GET_FORM, SAVE_FORM, SAVE_LOADING, SET_LOADING } from "./constants";

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
export function getFormAction(payload) {
  return {
    type: GET_FORM,
    payload,
  };
}
export const asyncGetFormAction = (dispatch) => (payload) =>
  new Promise((resolve) => dispatch({ type: GET_FORM, payload, resolve }));
export function saveFormAction(payload) {
  return {
    type: SAVE_FORM,
    payload,
  };
}
