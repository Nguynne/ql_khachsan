import {
  SET_LOADING,
  SAVE_LOADING,
  GET_NEWS_RESIDENT,
  SAVE_NEWS_RESIDENT,
  GET_DETAIL_NEWS_RESIDENT,
  SAVE_DETAIL_NEWS_RESIDENT,
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
export const asyncGetNewResidentAction = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ type: GET_NEWS_RESIDENT, payload, resolve })
  );
export function saveNewResidentAction(payload) {
  return {
    type: SAVE_NEWS_RESIDENT,
    payload,
  };
}
// get detail
export function getDetailNewsResidentAction(payload) {
  return {
    type: GET_DETAIL_NEWS_RESIDENT,
    payload,
  };
}
export const asyncGetDetailNewResidentAction = (dispatch) => (payload) =>
  new Promise((resolve) =>
    dispatch({ type: GET_DETAIL_NEWS_RESIDENT, payload, resolve })
  );
export function saveDetailNewResidentAction(payload) {
  return {
    type: SAVE_DETAIL_NEWS_RESIDENT,
    payload,
  };
}
