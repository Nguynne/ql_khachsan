import {
  SET_LOADING,
  SAVE_LOADING,
  GET_FEEDBACKS,
  SAVE_FEEDBACKS,
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
export function getFeedbacksAction(payload) {
  return {
    type: GET_FEEDBACKS,
    payload,
  };
}
export const asyncGetFeedbacksAction = (dispatch) => (payload) =>
  new Promise((resolve) => dispatch({ type: GET_FEEDBACKS, payload, resolve }));
export function saveFeedbacksAction(payload) {
  return {
    type: SAVE_FEEDBACKS,
    payload,
  };
}
