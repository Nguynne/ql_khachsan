import {
  CREAT_CONFIG,
  GET_CONFIG,
  SAVE_CONFIG,
  SET_LOADING,
  SAVE_LOADING,
} from "./constants";

export const asyncCreateConfigAction = (dispatch) => (payload) =>
  new Promise((resolve) => dispatch({ type: CREAT_CONFIG, payload, resolve }));

export const getCofigAction = (dispatch) => (payload) => {
  return new Promise((resolve) => {
    dispatch({ type: GET_CONFIG, payload, resolve });
  });
};
export function saveConfigAction(payload) {
  return {
    type: SAVE_CONFIG,
    payload,
  };
}
//loadung
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
