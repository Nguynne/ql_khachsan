import { SET_LOADING, SAVE_LOADING, CHANGE_PW } from "./constants";
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
export const asyncCreateUserAction = (dispatch) => (payload) =>
  new Promise((resolve) => dispatch({ type: CHANGE_PW, payload, resolve }));
