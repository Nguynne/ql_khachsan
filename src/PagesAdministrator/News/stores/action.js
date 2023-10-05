import {
  GET_ALL_NEWS,
  SAVE_ALL_NEWS,
  CREATE_NEWS,
  GET_DETAIL_NEWS,
  UPDATE_NEWS,
  DELETE_NEWS,
} from "./constants";

export function getAllNewsAction(payload) {
  return { type: GET_ALL_NEWS, payload };
}

export function saveAllNewsAction(payload) {
  return { type: SAVE_ALL_NEWS, payload };
}
export const asyncGetAllNewsAction = (dispatch) => (payload) =>
  new Promise((resolve) => dispatch({ type: GET_ALL_NEWS, payload, resolve }));
//** ---------------------CREATE NEWS---------------------- */
export const asyncCreateNewsAction = (dispatch) => (payload) =>
  new Promise((resolve) => dispatch({ type: CREATE_NEWS, payload, resolve }));
//** ---------------------GET NEWS DETAIL---------------------- */
export const asyncGetDetailNewsAction = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ type: GET_DETAIL_NEWS, payload, resolve })
  );
//** ---------------------UPDATE NEWS---------------------- */
export const asyncUpdateNewsAction = (dispatch) => (payload) =>
  new Promise((resolve) => dispatch({ type: UPDATE_NEWS, payload, resolve }));
//** ---------------------DELETE NEWS---------------------- */
export const asyncDeleteNewsAction = (dispatch) => (payload) =>
  new Promise((resolve) => dispatch({ type: DELETE_NEWS, payload, resolve }));
