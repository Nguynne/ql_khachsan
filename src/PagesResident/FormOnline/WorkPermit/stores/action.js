import { SET_LOADING, SAVE_LOADING, CREAT_FORM } from "./constants";
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

// create
export const asyncCreateFormsAction = (dispatch) => (payload) =>
  new Promise((resolve) => dispatch({ type: CREAT_FORM, payload, resolve }));
