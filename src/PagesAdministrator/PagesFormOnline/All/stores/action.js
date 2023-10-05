import {
  CREATE_FORMS,
  DELETE_FORMS,
  GET_ALL_FORMS,
  GET_DETAIL_FORMS,
  SAVE_ALL_FORMS,
  UPDATE_FORMS,
} from "./constants";

// get
export function getAllFormsAction(payload) {
  return {
    type: GET_ALL_FORMS,
    payload,
  };
}
export function saveAllFormAction(payload) {
  return {
    type: SAVE_ALL_FORMS,
    payload,
  };
}
//** ---------------------CREATE FORMS---------------------- */
export const asyncCreateFormsAction = (dispatch) => (payload) =>
  new Promise((resolve) => dispatch({ type: CREATE_FORMS, payload, resolve }));

export const asyncGetFormAction = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ type: GET_DETAIL_FORMS, payload, resolve })
  );

// delete
export const asyncDeleteFormAction = (dispatch) => (payload) => {
  return new Promise((resolve) => {
    dispatch({ type: DELETE_FORMS, payload, resolve });
  });
};
// update
export const asyncUpdateFormsAction = (dispatch) => (payload) => {
  return new Promise((resolve) => {
    dispatch({ type: UPDATE_FORMS, payload, resolve });
  });
};
