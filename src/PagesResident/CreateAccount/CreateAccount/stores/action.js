import { SET_LOADING, SAVE_LOADING, CREAT_ACCOUNT } from "./constants";
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
export const asyncCreateAccountAction = (dispatch) => (payload) =>
  new Promise((resolve) => dispatch({ type: CREAT_ACCOUNT, payload, resolve }));
